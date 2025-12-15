import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/api-middleware';
import { sendEmail, generateResetToken, getResetTokenExpiry } from '@/lib/email/sendEmail';
import { welcomeUserEmail } from '@/lib/email/emailTemplates';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { data, error } = await supabaseAdmin
   .from('users')
   .select('id, full_name, email, role, is_active, last_login, created_at')
   .order('created_at', { ascending: false });

  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
 }
}

export async function POST(request: NextRequest) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const body = await request.json();
  const { full_name, email, password } = body;

  if (!full_name || !email || !password) {
   return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
  }

  // Check if user already exists
  const { data: existing } = await supabaseAdmin
   .from('users')
   .select('id')
   .eq('email', email)
   .single();

  if (existing) {
   return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate reset token for first-time password setup
  const resetToken = generateResetToken();
  const resetTokenExpires = getResetTokenExpiry();

  // Create user
  const { data: user, error } = await supabaseAdmin
   .from('users')
   .insert({
    full_name,
    email,
    password: hashedPassword,
    role: 'super_admin',
    is_active: true,
    reset_token: resetToken,
    reset_token_expires: resetTokenExpires.toISOString(),
   })
   .select()
   .single();

  if (error) throw error;

  // Send welcome email with password setup link
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
  await sendEmail({
   to: email,
   subject: 'Welcome to CHH Europe Admin',
   html: welcomeUserEmail(full_name, resetLink),
  });

  return NextResponse.json({
   success: true,
   user: {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
   }
  }, { status: 201 });
 } catch (error: any) {
  console.error('Create user error:', error);
  return NextResponse.json({ error: error.message || 'Failed to create user' }, { status: 500 });
 }
}
