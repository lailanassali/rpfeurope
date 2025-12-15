import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/api-middleware';

export async function GET(request: NextRequest) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { searchParams } = new URL(request.url);
  const form_type = searchParams.get('form_type');

  let query = supabaseAdmin.from('form_submissions').select('*').order('created_at', { ascending: false });
  if (form_type) query = query.eq('form_type', form_type);

  const { data, error } = await query;
  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
 }
}
