import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/api-middleware';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status'); // 'approved', 'pending', 'all'

  let query = supabaseAdmin
   .from('testimonials')
   .select('*')
   .order('created_at', { ascending: false });

  if (status === 'approved') {
   query = query.eq('is_approved', true);
  } else if (status === 'pending') {
   query = query.eq('is_approved', false);
  }

  const { data, error } = await query;
  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
 }
}

export async function POST(request: NextRequest) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const body = await request.json();
  const { data, error } = await supabaseAdmin
   .from('testimonials')
   .insert(body)
   .select()
   .single();

  if (error) throw error;
  return NextResponse.json(data, { status: 201 });
 } catch (error) {
  return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
 }
}
