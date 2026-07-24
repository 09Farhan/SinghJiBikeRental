import { NextRequest, NextResponse } from 'next/server';
import { AdminService } from '@/services/admin.service';

export async function GET(req: NextRequest) {
  try {
    const adminToken = req.cookies.get('adminToken')?.value;
    if (!adminToken) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await AdminService.getDashboardStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
