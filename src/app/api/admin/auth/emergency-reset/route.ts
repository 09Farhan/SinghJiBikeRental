import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const adminPassword = await bcrypt.hash('Admin@123456', 10);
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@singhjibikes.com';
    
    await prisma.adminUser.update({
      where: { email: adminEmail },
      data: {
        passwordHash: adminPassword,
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Password reset successfully to Admin@123456. Please delete this endpoint immediately.' 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
