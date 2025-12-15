import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/api-middleware';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const tokenOrError = await requireSuperAdmin(request);
    if (tokenOrError instanceof NextResponse) return tokenOrError;

    const { id } = await params;

    const { data, error } = await supabaseAdmin.from('resources').select('*').eq('id', id).single();
    if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const tokenOrError = await requireSuperAdmin(request);
    if (tokenOrError instanceof NextResponse) return tokenOrError;

    const body = await request.json();
    const { id } = await params;

    const { data, error } = await supabaseAdmin
      .from('resources')
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
    const tokenOrError = await requireSuperAdmin(request);
    if (tokenOrError instanceof NextResponse) return tokenOrError;

    const { id } = await params;

    const { error } = await supabaseAdmin.from('resources').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
