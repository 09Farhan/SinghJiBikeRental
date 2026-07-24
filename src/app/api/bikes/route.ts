import { NextRequest, NextResponse } from 'next/server';
import { BikeService } from '@/services/bike.service';
import { bikeSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  try {
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

    const body = await req.json();
    const registrationNumber = body.registrationNumber;
    const validatedData = bikeSchema.parse(body);

    const bike = await BikeService.createBike({ ...validatedData, registrationNumber });
    return NextResponse.json({ success: true, data: bike }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Validation error' }, { status: 400 });
  }
}
