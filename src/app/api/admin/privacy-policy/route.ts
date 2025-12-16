import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/api-middleware';

export async function GET(request: NextRequest) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { data, error } = await supabaseAdmin
   .from('privacy_policy')
   .select('*')
   .order('created_at', { ascending: false })
   .limit(1)
   .single();

  if (error) {
   // If no policy exists yet, return empty
   if (error.code === 'PGRST116') {
    return NextResponse.json({ content: '', last_updated: null });
   }
   throw error;
  }

  return NextResponse.json(data);
 } catch (error) {
  console.error('Error fetching privacy policy:', error);
  return NextResponse.json({ error: 'Failed to fetch privacy policy' }, { status: 500 });
 }
}

export async function PUT(request: NextRequest) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const body = await request.json();
  const { content } = body;

  if (!content) {
   return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

  // Check if a policy already exists
  const { data: existing } = await supabaseAdmin
   .from('privacy_policy')
   .select('id')
   .limit(1)
   .single();

  let result;

  if (existing) {
   // Update existing policy
   const { data, error } = await supabaseAdmin
    .from('privacy_policy')
    .update({
     content,
     last_updated: new Date().toISOString(),
     updated_by: tokenOrError.id
    })
    .eq('id', existing.id)
    .select()
    .single();

   if (error) throw error;
   result = data;
  } else {
   // Create new policy
   const { data, error } = await supabaseAdmin
    .from('privacy_policy')
    .insert({
     content,
     updated_by: tokenOrError.id
    })
    .select()
    .single();

   if (error) throw error;
   result = data;
  }

  return NextResponse.json(result);
 } catch (error) {
  console.error('Error updating privacy policy:', error);
  return NextResponse.json({ error: 'Failed to update privacy policy' }, { status: 500 });
 }
}
