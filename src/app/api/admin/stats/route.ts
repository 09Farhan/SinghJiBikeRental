import { NextRequest, NextResponse } from 'next/server';
import { AdminService } from '@/services/admin.service';
import { RateLimitService } from '@/services/rate-limit.service';

export async function GET(req: NextRequest) {
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

    const stats = await AdminService.getDashboardStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
