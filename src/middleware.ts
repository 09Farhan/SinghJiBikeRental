import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isAdminRoute = path.startsWith('/admin');
  const isLoginRoute = path === '/admin/login';
  
  // Check for the adminToken cookie
  const token = request.cookies.get('adminToken')?.value;
  
  // If it's an admin route (but not the login page) and there's no token, redirect to login
  if (isAdminRoute && !isLoginRoute && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  // If user is already logged in and tries to access the login page, redirect to dashboard
  if (isLoginRoute && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all /admin routes
  matcher: ['/admin/:path*'],
};
