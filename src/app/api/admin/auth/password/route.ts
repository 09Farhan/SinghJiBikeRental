import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { AdminService } from '@/services/admin.service';
import { RateLimitService } from '@/services/rate-limit.service';

const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password is too long'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password is too long'),
}).strict();

export async function PUT(req: NextRequest) {
  try {
    const adminToken = req.cookies.get('adminToken')?.value;
    if (!adminToken) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await AdminService.verifyAdminToken(adminToken);
    if (!decoded) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    const ip = RateLimitService.getIp(req);
    const rateLimit = await RateLimitService.checkLimit(ip, decoded.id, 'auth');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = passwordUpdateSchema.parse(body);

    const admin = await prisma.adminUser.findUnique({ where: { id: decoded.id } });
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Admin not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Incorrect current password' }, { status: 400 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { passwordHash: hashedNewPassword }
    });

    await RateLimitService.clearLimit(ip, decoded.id, 'auth');

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
