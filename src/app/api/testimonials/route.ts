import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Public API - only fetch approved testimonials
export async function GET(request: NextRequest) {
 try {
  const { data, error } = await supabaseAdmin
   .from('testimonials')
   .select('*')
   .eq('is_approved', true)
   .order('created_at', { ascending: false });

  if (error) throw error;
  return NextResponse.json(data);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
 }
}
