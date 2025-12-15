import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/api-middleware';

// GET - List all events
export async function GET(request: NextRequest) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { data: events, error } = await supabaseAdmin
   .from('events')
   .select('*')
   .order('date', { ascending: false });

  if (error) {
   console.error('Database error:', error);
   return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }

  return NextResponse.json(events);
 } catch (error) {
  console.error('Error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}

// POST - Create new event
export async function POST(request: NextRequest) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const body = await request.json();
  const { title, slug, image_url, location, date, time, venue, description, category, badge_text, badge_color } = body;

  // Validate required fields
  if (!title || !slug || !location || !date || !time || !venue) {
   return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data: event, error } = await supabaseAdmin
   .from('events')
   .insert({
    title,
    slug,
    image_url,
    location,
    date,
    time,
    venue,
    description,
    category,
    badge_text,
    badge_color,
    created_by: tokenOrError.id,
   })
   .select()
   .single();

  if (error) {
   console.error('Database error:', error);
   return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }

  return NextResponse.json(event, { status: 201 });
 } catch (error) {
  console.error('Error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
