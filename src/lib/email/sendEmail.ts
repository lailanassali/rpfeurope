import crypto from 'crypto';

interface SendEmailParams {
 to: string | string[];
 cc?: string | string[];
 subject: string;
 html: string;
}

export async function sendEmail({ to, cc, subject, html }: SendEmailParams) {
 try {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || 'onboarding@resend.dev';

  if (!RESEND_API_KEY) {
   console.error('RESEND_API_KEY not configured');
   return { success: false, error: 'Email service not configured' };
  }

  const recipients = Array.isArray(to) ? to : [to];
  const ccRecipients = cc ? (Array.isArray(cc) ? cc : [cc]) : [];

  const response = await fetch('https://api.resend.com/emails', {
   method: 'POST',
   headers: {
    'Authorization': `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    from: FROM_EMAIL,
    to: recipients,
    cc: ccRecipients.length > 0 ? ccRecipients : undefined,
    subject,
    html,
   }),
  });

  if (!response.ok) {
   const error = await response.json();
   console.error('Resend API error:', error);
   return { success: false, error: error.message || 'Failed to send email' };
  }

  const data = await response.json();
  return { success: true, data };
 } catch (error: any) {
  console.error('Send email error:', error);
  return { success: false, error: error.message || 'Unknown error' };
 }
}

export function generateResetToken(): string {
 return crypto.randomBytes(32).toString('hex');
}

export function getResetTokenExpiry(): Date {
 const expiry = new Date();
 expiry.setHours(expiry.getHours() + 1); // 1 hour from now
 return expiry;
}
