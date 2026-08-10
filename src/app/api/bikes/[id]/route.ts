import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { BikeService } from '@/services/bike.service';
import { bikeSchema } from '@/lib/validations';
import { RateLimitService } from '@/services/rate-limit.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'public');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const bike = await BikeService.getBikeById(params.id);
    if (!bike) {
      return NextResponse.json({ success: false, error: 'Bike not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: bike });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch bike' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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
    const { registrationNumber, ...bikeData } = body;
    const validatedData = bikeSchema.partial().parse(bikeData);

    const bike = await BikeService.updateBike(params.id, { ...validatedData, registrationNumber });
    return NextResponse.json({ success: true, data: bike });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 });
    }
    console.error('[Bikes PUT API] Error:', error);
    return NextResponse.json({ success: false, error: 'An internal server error occurred' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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

    await BikeService.deleteBike(params.id);
    return NextResponse.json({ success: true, data: { message: 'Bike deleted' } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete bike' }, { status: 500 });
  }
}
