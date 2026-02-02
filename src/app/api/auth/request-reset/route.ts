import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendEmail, generateResetToken, getResetTokenExpiry } from '@/lib/email/sendEmail';
import { passwordResetEmail } from '@/lib/email/emailTemplates';

export async function POST(request: NextRequest) {
 try {
  const body = await request.json();
  const { email } = body;

  if (!email) {
   return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Find user by email
  const { data: user, error: userError } = await supabaseAdmin
   .from('users')
   .select('*')
   .eq('email', email)
   .single();

  // Don't reveal if user exists or not (security)
  if (userError || !user) {
   return NextResponse.json({
    success: true,
    message: 'If an account exists with this email, you will receive a password reset link'
   });
  }

  // Generate reset token
  const resetToken = generateResetToken();
  const resetTokenExpires = getResetTokenExpiry();

  // Save reset token to database
  const { error: updateError } = await supabaseAdmin
   .from('users')
   .update({
    reset_token: resetToken,
    reset_token_expires: resetTokenExpires.toISOString(),
   })
   .eq('id', user.id);

  if (updateError) throw updateError;

  // Send password reset email
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
  await sendEmail({
   to: email,
   subject: 'Reset Your Password - RPF Europe',
   html: passwordResetEmail(user.full_name, resetLink),
  });

  return NextResponse.json({
   success: true,
   message: 'If an account exists with this email, you will receive a password reset link'
  });
 } catch (error: any) {
  console.error('Request reset error:', error);
  return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
 }
}
