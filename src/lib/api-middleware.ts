import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function validateToken(req: NextRequest) {
 const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

 if (!token) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 }

 return token;
}

export async function requireSuperAdmin(req: NextRequest) {
 const token = await validateToken(req);

 if (token instanceof NextResponse) {
  return token; // Return error response
 }

 if (token.role !== 'superadmin') {
  return NextResponse.json({ error: 'Forbidden - Superadmin access required' }, { status: 403 });
 }

 return token;
}

export async function requireAdmin(req: NextRequest) {
 const token = await validateToken(req);

 if (token instanceof NextResponse) {
  return token; // Return error response
 }

 if (token.role !== 'admin' && token.role !== 'superadmin') {
  return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
 }

 return token;
}
