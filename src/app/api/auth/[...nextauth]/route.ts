import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
 providers: [
  CredentialsProvider({
   name: 'Credentials',
   credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" }
   },
   async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
     throw new Error('Invalid credentials');
    }

    // Find user in database
    const { data: user, error } = await supabaseAdmin
     .from('users')
     .select('*')
     .eq('email', credentials.email)
     .single();

    if (error || !user) {
     throw new Error('User not found');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
     credentials.password,
     user.password
    );

    if (!isValidPassword) {
     throw new Error('Invalid password');
    }

    return {
     id: user.id,
     email: user.email,
     name: user.name,
     role: user.role,
    };
   },
  }),
 ],
 callbacks: {
  async jwt({ token, user }) {
   if (user) {
    token.role = user.role;
    token.id = user.id;
   }
   return token;
  },
  async session({ session, token }) {
   if (session.user) {
    session.user.role = token.role as 'admin' | 'superadmin';
    session.user.id = token.id as string;
   }
   return session;
  },
 },
 pages: {
  signIn: '/admin/login',
 },
 session: {
  strategy: 'jwt',
 },
 secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
