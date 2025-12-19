import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/api-middleware';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const tokenOrError = await requireSuperAdmin(request);
    if (tokenOrError instanceof NextResponse) return tokenOrError;

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = supabaseAdmin.from('faqs').select('*').order('order_index', { ascending: true });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const tokenOrError = await requireSuperAdmin(request);
    if (tokenOrError instanceof NextResponse) return tokenOrError;

    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from('faqs')
      .insert(body)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
