import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Public API - no auth required
export async function GET(request: NextRequest) {
 try {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const location = searchParams.get('location');

  let query = supabaseAdmin
   .from('events')
   .select('*')
   .gte('date', new Date().toISOString().split('T')[0])
   .order('date', { ascending: true });

  if (category) query = query.eq('category', category);
  if (location) query = query.eq('location', location);

  const { data, error } = await query;
  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
 }
}
