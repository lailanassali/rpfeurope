import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/api-middleware';

// GET - Single event
export async function GET(
 request: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { id } = await params;

  const { data: event, error } = await supabaseAdmin
   .from('events')
   .select('*')
   .eq('id', id)
   .single();

  if (error || !event) {
   return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json(event);
 } catch (error) {
  console.error('Error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}

// PUT - Update event
export async function PUT(
 request: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const body = await request.json();
  const { title, slug, image_url, location, date, time, venue, description, category, badge_text, badge_color } = body;

  const { id } = await params;

  const { data: event, error } = await supabaseAdmin
   .from('events')
   .update({
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
    updated_at: new Date().toISOString(),
   })
   .eq('id', id)
   .select()
   .single();

  if (error) {
   console.error('Database error:', error);
   return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }

  return NextResponse.json(event);
 } catch (error) {
  console.error('Error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}

// DELETE - Delete event
export async function DELETE(
 request: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
 try {
  const tokenOrError = await requireAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { id } = await params;

  const { error } = await supabaseAdmin
   .from('events')
   .delete()
   .eq('id', id);

  if (error) {
   console.error('Database error:', error);
   return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
 } catch (error) {
  console.error('Error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
