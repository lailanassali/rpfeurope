import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/api-middleware';

export async function GET(request: NextRequest) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { data, error } = await supabaseAdmin
   .from('resources')
   .select('*')
   .order('created_at', { ascending: false });

  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
 }
}

export async function POST(request: NextRequest) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const body = await request.json();
  const { data, error } = await supabaseAdmin
   .from('resources')
   .insert({ ...body, created_by: tokenOrError.id })
   .select()
   .single();

  if (error) throw error;
  return NextResponse.json(data, { status: 201 });
 } catch (error) {
  return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
 }
}
