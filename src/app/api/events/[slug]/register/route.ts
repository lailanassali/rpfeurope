import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
 try {
  const body = await request.json();
  const { name, email, phone } = body;

  if (!name || !email || !phone) {
   return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { slug } = await params;

  // Get event ID from slug
  const { data: event } = await supabaseAdmin.from('events').select('id').eq('slug', slug).single();
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });

  // Check for duplicate registration
  const { data: existingRegistration } = await supabaseAdmin
   .from('event_registrations')
   .select('id')
   .eq('event_id', event.id)
   .or(`email.eq.${email},phone.eq.${phone}`)
   .maybeSingle();

  if (existingRegistration) {
   return NextResponse.json(
    { error: 'You have already registered for this event with this email or phone number.' },
    { status: 409 }
   );
  }

  // Insert registration
  const { data, error } = await supabaseAdmin
   .from('event_registrations')
   .insert({ event_id: event.id, name, email, phone })
   .select()
   .single();

  if (error) throw error;
  return NextResponse.json({ success: true, data }, { status: 201 });
 } catch (error) {
  return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
 }
}
