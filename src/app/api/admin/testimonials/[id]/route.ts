import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/api-middleware';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { id } = await params;

  const { data, error } = await supabaseAdmin
   .from('testimonials')
   .select('*')
   .eq('id', id)
   .single();

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Internal error' }, { status: 500 });
 }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const body = await request.json();
  const { id } = await params;

  const { data, error } = await supabaseAdmin
   .from('testimonials')
   .update({ ...body, updated_at: new Date().toISOString() })
   .eq('id', id)
   .select()
   .single();

  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
 }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { id } = await params;

  const { error } = await supabaseAdmin
   .from('testimonials')
   .delete()
   .eq('id', id);

  if (error) throw error;
  return NextResponse.json({ success: true });
 } catch (error) {
  return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
 }
}

// Quick approval endpoint
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { id } = await params;
  const { is_approved } = await request.json();

  const { data, error } = await supabaseAdmin
   .from('testimonials')
   .update({ is_approved, updated_at: new Date().toISOString() })
   .eq('id', id)
   .select()
   .single();

  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to update approval status' }, { status: 500 });
 }
}
