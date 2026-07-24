import { NextRequest, NextResponse } from 'next/server';
import { BikeService } from '@/services/bike.service';
import { bikeSchema } from '@/lib/validations';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
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

    const body = await req.json();
    const registrationNumber = body.registrationNumber;
    const validatedData = bikeSchema.partial().parse(body);

    const bike = await BikeService.updateBike(params.id, { ...validatedData, registrationNumber });
    return NextResponse.json({ success: true, data: bike });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Validation error' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminToken = req.cookies.get('adminToken')?.value;
    if (!adminToken) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await BikeService.deleteBike(params.id);
    return NextResponse.json({ success: true, data: { message: 'Bike deleted' } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete bike' }, { status: 500 });
  }
}
