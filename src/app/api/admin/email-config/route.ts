import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/api-middleware';

export async function GET(request: NextRequest) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { data, error } = await supabaseAdmin
   .from('email_config')
   .select('*');

  if (error) throw error;

  // Convert array to object for easier access
  const config: any = {};
  data.forEach(item => {
   config[item.config_key] = item.config_value;
  });

  return NextResponse.json(config);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch email config' }, { status: 500 });
 }
}

export async function PUT(request: NextRequest) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const body = await request.json();
  const { primary_email, cc_emails } = body;

  // Update primary email
  if (primary_email) {
   await supabaseAdmin
    .from('email_config')
    .upsert({ config_key: 'primary_email', config_value: primary_email });
  }

  // Update CC emails
  if (cc_emails !== undefined) {
   await supabaseAdmin
    .from('email_config')
    .upsert({ config_key: 'cc_emails', config_value: cc_emails });
  }

  return NextResponse.json({ success: true });
 } catch (error) {
  return NextResponse.json({ error: 'Failed to update email config' }, { status: 500 });
 }
}
