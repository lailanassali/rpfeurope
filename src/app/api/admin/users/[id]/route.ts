import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/api-middleware';

export async function GET(
 request: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { id } = await params;

  const { data, error } = await supabaseAdmin
   .from('users')
   .select('id, name, email, role, is_active, last_login, created_at')
   .eq('id', id)
   .single();

  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
 }
}

export async function PUT(
 request: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { id } = await params;
  const body = await request.json();
  const { name, is_active } = body;

  const updateData: any = {};
  if (name !== undefined) updateData.name = name;
  if (is_active !== undefined) updateData.is_active = is_active;

  const { data, error } = await supabaseAdmin
   .from('users')
   .update(updateData)
   .eq('id', id)
   .select()
   .single();

  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
 }
}

export async function DELETE(
 request: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { id } = await params;

  const { error } = await supabaseAdmin
   .from('users')
   .delete()
   .eq('id', id);

  if (error) throw error;
  return NextResponse.json({ success: true });
 } catch (error) {
  return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
 }
}
