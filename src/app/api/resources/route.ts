import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Public API - no auth required
export async function GET(request: NextRequest) {
 try {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = searchParams.get('limit');

  let query = supabaseAdmin
   .from('resources')
   .select('*')
   .order('order_index', { ascending: true });

  if (category) {
   query = query.eq('category', category);
  }

  if (limit) {
   query = query.limit(parseInt(limit));
  }

  const { data, error } = await query;
  if (error) throw error;
  return NextResponse.json(data || []);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
 }
}
