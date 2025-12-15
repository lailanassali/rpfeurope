import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/api-middleware';

export async function GET(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { data, error } = await supabaseAdmin
   .from('users')
   .select('id, full_name, email, role, is_active, last_login, created_at')
   .eq('id', params.id)
   .single();

  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
 }
}

export async function PUT(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const body = await request.json();
  const { full_name, is_active } = body;

  const updateData: any = {};
  if (full_name !== undefined) updateData.full_name = full_name;
  if (is_active !== undefined) updateData.is_active = is_active;

  const { data, error } = await supabaseAdmin
   .from('users')
   .update(updateData)
   .eq('id', params.id)
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
 { params }: { params: { id: string } }
) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { error } = await supabaseAdmin
   .from('users')
   .delete()
   .eq('id', params.id);

  if (error) throw error;
  return NextResponse.json({ success: true });
 } catch (error) {
  return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
 }
}
