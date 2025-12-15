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
      const { error: primaryError } = await supabaseAdmin
        .from('email_config')
        .upsert(
          { config_key: 'primary_email', config_value: primary_email },
          { onConflict: 'config_key' }
        );

      if (primaryError) {
        console.error('Error updating primary email:', primaryError);
        throw primaryError;
      }
    }

    // Update CC emails
    if (cc_emails !== undefined) {
      const { error: ccError } = await supabaseAdmin
        .from('email_config')
        .upsert(
          { config_key: 'cc_emails', config_value: cc_emails },
          { onConflict: 'config_key' }
        );

      if (ccError) {
        console.error('Error updating CC emails:', ccError);
        throw ccError;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email config update error:', error);
    return NextResponse.json({
      error: 'Failed to update email config',
      message: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
