import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { slugify } from '@/lib/location-utils';

export const dynamic = 'force-dynamic';

// Haversine formula to calculate distance
function calculateDistance(
 lat1: number,
 lon1: number,
 lat2: number,
 lon2: number
): number {
 const R = 6371; // Earth's radius in kilometers
 const dLat = toRadians(lat2 - lat1);
 const dLon = toRadians(lon2 - lon1);

 const a =
  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(toRadians(lat1)) *
  Math.cos(toRadians(lat2)) *
  Math.sin(dLon / 2) *
  Math.sin(dLon / 2);

 const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 return R * c;
}

function toRadians(degrees: number): number {
 return degrees * (Math.PI / 180);
}

function kmToMiles(km: number): number {
 return Math.round(km * 0.621371 * 10) / 10;
}

export async function GET(request: NextRequest) {
 try {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 3; // Default to 3

  if (!lat || !lon) {
   return NextResponse.json(
    { error: 'Latitude and longitude are required' },
    { status: 400 }
   );
  }

  const userLat = parseFloat(lat);
  const userLon = parseFloat(lon);

  if (isNaN(userLat) || isNaN(userLon)) {
   return NextResponse.json(
    { error: 'Invalid coordinates' },
    { status: 400 }
   );
  }

  if (isNaN(limit) || limit < 1) {
   return NextResponse.json(
    { error: 'Invalid limit parameter' },
    { status: 400 }
   );
  }

  // Fetch all locations with coordinates
  const { data, error } = await supabaseAdmin
   .from('locations')
   .select('*')
   .not('latitude', 'is', null)
   .not('longitude', 'is', null);

  if (error) throw error;

  // Calculate distance for each location
  const locationsWithDistance = (data || [])
   .map((loc) => {
    const distanceKm = calculateDistance(
     userLat,
     userLon,
     loc.latitude,
     loc.longitude
    );
    return {
     ...loc,
     slug: slugify(loc.name),
     distance: kmToMiles(distanceKm),
    };
   })
   .sort((a, b) => a.distance - b.distance) // Sort by distance
   .slice(0, limit); // Limit based on query parameter

  return NextResponse.json(locationsWithDistance);
 } catch (error) {
  console.error('Error fetching nearest locations:', error);
  return NextResponse.json(
   { error: 'Failed to fetch nearest locations' },
   { status: 500 }
  );
 }
}
