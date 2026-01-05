"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceLocationCard } from "@/components/common/ServiceLocationCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LocationWithDistance {
 name: string;
 slug: string;
 tag: string;
 address: string;
 image_url: string;
 services: string;
 map_link: string;
 whatsapp_link: string;
 latitude: number | null;
 longitude: number | null;
 how_to_find_us: string;
 distance: number; // in miles
}

function NearestLocationsContent() {
 const searchParams = useSearchParams();
 const [locations, setLocations] = useState<LocationWithDistance[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const limit = 6;

 const userLat = searchParams.get("lat");
 const userLon = searchParams.get("lon");

 useEffect(() => {
  async function fetchNearestLocations() {
   if (!userLat || !userLon) {
    setError("Location coordinates not provided");
    setIsLoading(false);
    return;
   }

   try {
    const response = await fetch(`/api/nearest-locations?lat=${userLat}&lon=${userLon}&limit=${limit}`);
    if (!response.ok) {
     throw new Error("Failed to fetch locations");
    }

    const data: LocationWithDistance[] = await response.json();
    setLocations(data);
   } catch (err) {
    console.error("Error fetching locations:", err);
    setError("Failed to load locations");
   } finally {
    setIsLoading(false);
   }
  }

  fetchNearestLocations();
 }, [userLat, userLon, limit]);

 // Helper function to parse services
 function parseServices(servicesStr: string | null): string[] {
  if (!servicesStr) return [];
  return servicesStr.split("|").map((s) => s.trim()).filter((s) => s.length > 0);
 }

 if (error) {
  return (
   <div className="flex min-h-screen flex-col">
    <main className="flex-1 py-10 bg-gray-50">
     <div className="container w-11/12 mx-auto px-4">
      <Link
       href="/"
       className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
      >
       <ArrowLeft className="size-5" />
       <span className="font-medium">Back to Home</span>
      </Link>
      <div className="bg-white rounded-lg p-8 text-center">
       <p className="text-red-600 text-lg">{error}</p>
       <Link
        href="/join-service"
        className="text-primary hover:underline mt-4 inline-block"
       >
        View all locations
       </Link>
      </div>
     </div>
    </main>
   </div>
  );
 }

 return (
  <div className="flex min-h-screen flex-col">
   <main className="flex-1 py-10 bg-gray-50">
    <div className="container w-11/12 mx-auto px-4">
     <Link
      href="/"
      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
     >
      <ArrowLeft className="size-5" />
      <span className="font-medium">Back to Home</span>
     </Link>

     <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
       Top {limit} Nearest Branches
      </h1>
      <p className="text-gray-600">
       The {limit} closest CHH locations to you
      </p>
     </div>

     {isLoading ? (
      <div className="flex justify-center items-center py-20">
       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
     ) : locations.length === 0 ? (
      <div className="bg-white rounded-lg p-8 text-center">
       <p className="text-gray-600 text-lg">
        No locations found with location data.
       </p>
       <Link
        href="/join-service"
        className="text-primary hover:underline mt-4 inline-block"
       >
        View all locations
       </Link>
      </div>
     ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {locations.map((location) => (
        <ServiceLocationCard
         key={location.slug}
         slug={location.slug}
         image={location.image_url}
         title={location.name}
         services={parseServices(location.services)}
         address={location.address}
         mapLink={
          location.map_link ||
          `https://maps.google.com/?q=${encodeURIComponent(location.address || location.name)}`
         }
         howToFindUs={location.how_to_find_us}
         distance={location.distance}
        />
       ))}
      </div>
     )}
    </div>
   </main>
  </div>
 );
}

export default function NearestLocationsPage() {
 return (
  <Suspense
   fallback={
    <div className="flex min-h-screen flex-col">
     <main className="flex-1 py-10 bg-gray-50">
      <div className="container w-11/12 mx-auto px-4">
       <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
       </div>
      </div>
     </main>
    </div>
   }
  >
   <NearestLocationsContent />
  </Suspense>
 );
}
