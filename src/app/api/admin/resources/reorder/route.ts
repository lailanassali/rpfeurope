import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/api-middleware';

export async function POST(request: NextRequest) {
 try {
  const tokenOrError = await requireSuperAdmin(request);
  if (tokenOrError instanceof NextResponse) return tokenOrError;

  const { items } = await request.json();

  if (!Array.isArray(items)) {
   return NextResponse.json({ error: 'Invalid items format' }, { status: 400 });
  }

  // Update each item's order_index
  // We doing this in a loop for now, ideally we'd use a transaction or upsert
  // Supabase upsert with multiple rows is cleaner
  const updates = items.map((item: any, index: number) => ({
   id: item.id,
   order_index: index,
   updated_at: new Date().toISOString() // Good practice to update this
  }));

  // We only update the order_index (and updated_at) for these IDs
  // Note: This requires the table to allow updating these fields
  const { error } = await supabaseAdmin
   .from('resources')
   .upsert(updates, { onConflict: 'id', ignoreDuplicates: false });

  if (error) {
   console.error('Error reordering resources:', error);
   throw error;
  }

  return NextResponse.json({ success: true });
 } catch (error) {
  console.error('Reorder error:', error);
  return NextResponse.json({ error: 'Failed to reorder resources' }, { status: 500 });
 }
}
