import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendEmail } from '@/lib/email/sendEmail';
import { formSubmissionEmail } from '@/lib/email/emailTemplates';

export async function POST(request: NextRequest) {
 try {
  const body = await request.json();
  const { form_type, data } = body;

  if (!form_type || !data) {
   return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data: submission, error } = await supabaseAdmin
   .from('form_submissions')
   .insert({ form_type, data, status: 'new' })
   .select()
   .single();

  if (error) throw error;

  // Send email notification
  try {
   // Fetch email configuration
   const { data: emailConfig } = await supabaseAdmin
    .from('email_config')
    .select('*');

   const config: any = {};
   emailConfig?.forEach(item => {
    config[item.config_key] = item.config_value;
   });

   const primaryEmail = config.primary_email || 'admin@chheurope.com';
   const ccEmails = config.cc_emails ? config.cc_emails.split('|').map((e: string) => e.trim()).filter(Boolean) : [];

   // Send email
   await sendEmail({
    to: primaryEmail,
    cc: ccEmails.length > 0 ? ccEmails : undefined,
    subject: `New Form Submission: ${form_type}`,
    html: formSubmissionEmail(form_type, data),
   });
  } catch (emailError) {
   console.error('Failed to send notification email:', emailError);
   // Don't fail the request if email fails
  }

  return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
 } catch (error: any) {
  console.error('Submission error:', error);
  return NextResponse.json({
   error: 'Failed to submit',
   message: error?.message || 'Unknown error',
   details: error?.details || error?.hint || null
  }, { status: 500 });
 }
}
