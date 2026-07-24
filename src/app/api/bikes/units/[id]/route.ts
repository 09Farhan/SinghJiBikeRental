import { NextRequest, NextResponse } from 'next/server';
import { BikeService } from '@/services/bike.service';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminToken = req.cookies.get('adminToken')?.value;
    if (!adminToken) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await BikeService.removeBikeUnit(params.id);
    return NextResponse.json({ success: true, data: { message: 'Unit deleted successfully' } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete unit' }, { status: 500 });
  }
}
