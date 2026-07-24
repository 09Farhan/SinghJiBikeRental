import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations';
import { AdminService } from '@/services/admin.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const admin = await AdminService.authenticateAdmin(email, password);
    
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const token = AdminService.createAdminToken(admin);

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
    return NextResponse.json({ success: false, error: error.message || 'Authentication error' }, { status: 400 });
  }
}
