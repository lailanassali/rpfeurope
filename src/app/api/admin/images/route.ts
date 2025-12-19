import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/api-middleware';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');

  let query = supabaseAdmin.from('page_images').select('*').order('order', { ascending: true });
  if (page) query = query.eq('page_identifier', page);

  const { data, error } = await query;
  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
 }
}

export async function POST(request: NextRequest) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const body = await request.json();
  const { page_identifier, image_url, is_carousel, order } = body;

  // If not carousel, delete existing images for this page
  if (!is_carousel) {
   await supabaseAdmin.from('page_images').delete().eq('page_identifier', page_identifier);
  }

  const { data, error } = await supabaseAdmin
   .from('page_images')
   .insert({
    page_identifier,
    image_url,
    is_carousel,
    order: order || 0,
    created_by: tokenOrError.id,
   })
   .select()
   .single();

  if (error) throw error;
  return NextResponse.json(data, { status: 201 });
 } catch (error) {
  return NextResponse.json({ error: 'Failed to create image' }, { status: 500 });
 }
}
