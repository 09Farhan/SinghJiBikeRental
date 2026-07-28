import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const adminPassword = await bcrypt.hash('Admin@123456', 10);
    
    await prisma.adminUser.updateMany({
      data: {
        passwordHash: adminPassword,
      },
    });
    
    const admins = await prisma.adminUser.findMany({
      select: { email: true }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'All admin passwords reset successfully to Admin@123456. Please delete this endpoint immediately.',
      adminEmails: admins.map(a => a.email)
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
