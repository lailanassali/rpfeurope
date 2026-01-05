import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { slugify } from '@/lib/location-utils';

export const dynamic = 'force-dynamic';

export async function GET() {
 try {
  const { data, error } = await supabaseAdmin
   .from('locations')
   .select('*')
   .order('tag', { ascending: true })
   .order('name', { ascending: true });

  if (error) throw error;

  // Add slug to each location
  const locationsWithSlug = (data || []).map((loc) => ({
   ...loc,
   slug: slugify(loc.name),
  }));

  return NextResponse.json(locationsWithSlug);
 } catch (error) {
  return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
 }
}
