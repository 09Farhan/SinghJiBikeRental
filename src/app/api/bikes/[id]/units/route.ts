import { NextRequest, NextResponse } from 'next/server';
import { BikeService } from '@/services/bike.service';
import { RateLimitService } from '@/services/rate-limit.service';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminToken = req.cookies.get('adminToken')?.value;
    if (!adminToken) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'authenticated');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const body = await req.json();
    const { registrationNumber, color = 'Standard' } = body;
    
    if (!registrationNumber) {
      return NextResponse.json({ success: false, error: 'Registration number is required' }, { status: 400 });
    }

    const unit = await BikeService.addBikeUnit(params.id, { registrationNumber, color });
    return NextResponse.json({ success: true, data: unit }, { status: 201 });
  } catch (error) {
    console.error('[Add Unit API] Error:', error);
    return NextResponse.json({ success: false, error: 'An internal server error occurred' }, { status: 500 });
  }
}
