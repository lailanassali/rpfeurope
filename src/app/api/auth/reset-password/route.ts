import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
 try {
  const body = await request.json();
  const { token, password } = body;

  if (!token || !password) {
   return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
  }

  // Find user with valid reset token
  const { data: user, error: userError } = await supabaseAdmin
   .from('users')
   .select('*')
   .eq('reset_token', token)
   .single();

  if (userError || !user) {
   return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
  }

  // Check if token is expired
  if (new Date(user.reset_token_expires) < new Date()) {
   return NextResponse.json({ error: 'Reset token has expired' }, { status: 400 });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update password and clear reset token
  const { error: updateError } = await supabaseAdmin
   .from('users')
   .update({
    password: hashedPassword,
    reset_token: null,
    reset_token_expires: null,
   })
   .eq('id', user.id);

  if (updateError) throw updateError;

  return NextResponse.json({ success: true, message: 'Password reset successfully' });
 } catch (error: any) {
  console.error('Password reset error:', error);
  return NextResponse.json({ error: error.message || 'Failed to reset password' }, { status: 500 });
 }
}
