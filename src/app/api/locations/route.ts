import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
 try {
  const { data, error } = await supabaseAdmin
   .from('locations')
   .select('*')
   .order('tag', { ascending: true })
   .order('name', { ascending: true });

  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
 }
}
