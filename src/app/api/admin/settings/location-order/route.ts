
import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
 try {
  // 1. Fetch saved order
  const { data: configData } = await supabaseAdmin
   .from('locations')
   .select('welcome_description')
   .eq('tag', '_CONFIG_')
   .eq('name', 'TAG_ORDER')
   .single();

  const savedOrder: string[] = configData?.welcome_description
   ? JSON.parse(configData.welcome_description)
   : ['RPF UK', 'RPF Europe', 'RPF Africa', 'RPF on Campus'];

  // 2. Fetch all existing tags from locations to discover new ones
  const { data: locationsData } = await supabaseAdmin
   .from('locations')
   .select('tag')
   .neq('tag', '_CONFIG_');

  const allTags = Array.from(new Set(locationsData?.map(l => l.tag) || []));

  // 3. Merge: Start with savedOrder, then add any tags from allTags that aren't in savedOrder
  const mergedOrder = [...savedOrder];
  allTags.forEach(tag => {
   if (tag && !mergedOrder.includes(tag)) {
    mergedOrder.push(tag);
   }
  });

  return NextResponse.json(mergedOrder);
 } catch (error) {
  console.error('Error in GET /api/admin/settings/location-order:', error);
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
 }
}

export async function POST(request: Request) {
 try {
  const order = await request.json();

  if (!Array.isArray(order)) {
   return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
  }

  // Check if config row exists
  const { data: existing } = await supabaseAdmin
   .from('locations')
   .select('id')
   .eq('tag', '_CONFIG_')
   .eq('name', 'TAG_ORDER')
   .single();

  let error;
  if (existing) {
   // Update
   const { error: updateError } = await supabaseAdmin
    .from('locations')
    .update({
     welcome_description: JSON.stringify(order)
    })
    .eq('id', existing.id);
   error = updateError;
  } else {
   // Create
   const { error: insertError } = await supabaseAdmin
    .from('locations')
    .insert({
     name: 'TAG_ORDER',
     tag: '_CONFIG_',
     welcome_description: JSON.stringify(order),
     // Fill other required fields with dummy data if necessary, assuming mostly nullable or defaulted
    });
   error = insertError;
  }

  if (error) {
   console.error('Error saving location order:', error);
   return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
 } catch (error) {
  console.error('Error in POST /api/admin/settings/location-order:', error);
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
 }
}
