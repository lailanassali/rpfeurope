import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';

export async function getSession() {
 return await getServerSession(authOptions);
}

export async function getCurrentUser() {
 const session = await getSession();
 return session?.user;
}

export async function requireAuth() {
 const session = await getSession();
 if (!session) {
  throw new Error('Unauthorized');
 }
 return session;
}

export async function requireRole(role: 'admin' | 'superadmin') {
 const session = await requireAuth();
 if (session.user.role !== role && session.user.role !== 'superadmin') {
  throw new Error('Forbidden');
 }
 return session;
}

export function isSuperAdmin(role?: string) {
 return role === 'superadmin';
}

export function hasAccess(userRole?: string, requiredRole?: 'admin' | 'superadmin') {
 if (!userRole) return false;
 if (userRole === 'superadmin') return true;
 if (!requiredRole) return true;
 return userRole === requiredRole;
}
