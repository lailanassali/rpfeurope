import nodemailer from 'nodemailer';
import crypto from 'crypto';

interface SendEmailParams {
 to: string | string[];
 cc?: string | string[];
 subject: string;
 html: string;
}

export async function sendEmail({ to, cc, subject, html }: SendEmailParams) {
 try {
  const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
  const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || SMTP_USER;

  if (!SMTP_USER || !SMTP_PASS) {
   console.error('SMTP credentials not configured');
   return { success: false, error: 'Email service not configured' };
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
   host: SMTP_HOST,
   port: SMTP_PORT,
   secure: SMTP_PORT === 465, // true for 465, false for other ports
   auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
   },
  });

  // Verify connection
  await transporter.verify();

  const recipients = Array.isArray(to) ? to.join(', ') : to;
  const ccRecipients = cc ? (Array.isArray(cc) ? cc.join(', ') : cc) : undefined;

  // Send email
  const info = await transporter.sendMail({
   from: FROM_EMAIL,
   to: recipients,
   cc: ccRecipients,
   subject,
   html,
  });

  return { success: true, data: { id: info.messageId } };
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
