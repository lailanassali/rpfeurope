import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
 try {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');

  if (!page) {
   return NextResponse.json({ error: 'Page identifier required' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
   .from('page_images')
   .select('*')
   .eq('page_identifier', page)
   .order('order', { ascending: true });

  if (error) throw error;

  // If it's a carousel, return array; otherwise return single image
  const isCarousel = data.length > 0 && data[0].is_carousel;
  return NextResponse.json(isCarousel ? data : data[0] || null);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
 }
}
