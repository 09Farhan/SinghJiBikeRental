import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { BikeService } from '@/services/bike.service';
import { bikeSchema } from '@/lib/validations';
import { RateLimitService } from '@/services/rate-limit.service';

export async function GET(req: NextRequest) {
  try {
    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, null, 'public');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const filters = {
      category: searchParams.get('category') || undefined,
      brand: searchParams.get('brand') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      sortBy: searchParams.get('sortBy') || undefined,
    };

    const bikes = await BikeService.getAllBikes(filters);
    return NextResponse.json({ success: true, data: bikes });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch bikes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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
    const registrationNumber = body.registrationNumber;
    const validatedData = bikeSchema.parse(body);

    const bike = await BikeService.createBike({ ...validatedData, registrationNumber });
    return NextResponse.json({ success: true, data: bike }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error('[Bikes POST API] Error:', error);
    return NextResponse.json({ success: false, error: 'An internal server error occurred' }, { status: 500 });
  }
}
