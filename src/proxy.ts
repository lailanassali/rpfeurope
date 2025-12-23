import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
 const { pathname } = request.nextUrl;

 // Protect /admin routes (except auth pages)
 if (
  pathname.startsWith('/admin') &&
  !pathname.startsWith('/admin/login') &&
  !pathname.startsWith('/admin/forgot-password') &&
  !pathname.startsWith('/admin/reset-password')
 ) {
  const token = await getToken({
   req: request,
   secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
   const url = new URL('/admin/login', request.url);
   url.searchParams.set('callbackUrl', pathname);
   return NextResponse.redirect(url);
  }
 }

 return NextResponse.next();
}

export const config = {
 matcher: ['/admin/:path*'],
};
