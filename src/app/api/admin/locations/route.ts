import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/api-middleware';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { data, error } = await supabaseAdmin
   .from('locations')
   .select('*')
   .neq('tag', '_CONFIG_')
   .order('name', { ascending: true });

  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
 }
}

export async function POST(request: NextRequest) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const body = await request.json();
  const { data, error } = await supabaseAdmin
   .from('locations')
   .insert({ ...body, created_by: tokenOrError.id })
   .select()
   .single();

  if (error) throw error;
  return NextResponse.json(data, { status: 201 });
 } catch (error) {
  return NextResponse.json({ error: 'Failed to create location' }, { status: 500 });
 }
}
