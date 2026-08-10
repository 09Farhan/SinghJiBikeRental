import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { loginSchema } from '@/lib/validations';
import { AdminService } from '@/services/admin.service';
import { RateLimitService } from '@/services/rate-limit.service';

export async function POST(req: NextRequest) {
  try {
    const ip = RateLimitService.getIp(req);
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const rateLimit = await RateLimitService.checkLimit(ip, email, 'auth');
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const admin = await AdminService.authenticateAdmin(email, password);
    
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const token = AdminService.createAdminToken(admin);

    // Clear limit on successful login
    await RateLimitService.clearLimit(ip, email, 'auth');

    const response = NextResponse.json({ 
      success: true, 
      data: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      } 
    });

    response.cookies.set({
      name: 'adminToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error: any) {
    console.error('[Admin Auth API] Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'An internal server error occurred' }, { status: 500 });
  }
}
