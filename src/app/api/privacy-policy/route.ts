import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
 try {
  const { data, error } = await supabaseAdmin
   .from('privacy_policy')
   .select('content, last_updated')
   .order('created_at', { ascending: false })
   .limit(1)
   .single();

  if (error) {
   // If no policy exists yet, return null
   if (error.code === 'PGRST116') {
    return NextResponse.json({ content: null, last_updated: null });
   }
   throw error;
  }

  return NextResponse.json(data);
 } catch (error) {
  console.error('Error fetching privacy policy:', error);
  return NextResponse.json({ error: 'Failed to fetch privacy policy' }, { status: 500 });
 }
}
