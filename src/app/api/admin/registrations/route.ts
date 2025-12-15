import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/api-middleware';

export async function GET(request: NextRequest) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { searchParams } = new URL(request.url);
  const event_id = searchParams.get('event_id');

  let query = supabaseAdmin
   .from('event_registrations')
   .select('*, events(title)')
   .order('registered_at', { ascending: false });

  if (event_id) query = query.eq('event_id', event_id);

  const { data, error } = await query;
  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
 }
}
