"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

export function UpcomingEventCard() {
 const [event, setEvent] = useState<any>(null);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  fetchLatestEvent();
 }, []);

 async function fetchLatestEvent() {
  try {
   const res = await fetch('/api/events?limit=1');
   if (!res.ok) throw new Error();
   const data = await res.json();
   if (data && data.length > 0) {
    setEvent(data[0]);
   }
  } catch (error) {
   console.error('Failed to fetch event:', error);
  } finally {
   setIsLoading(false);
  }
 }

 if (isLoading) {
  return (
   <div className="relative h-[542px] rounded-2xl overflow-hidden flex items-center justify-center bg-gray-200">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
   </div>
  );
 }

 if (!event) {
  // Fallback content
  return (
   <div className="relative md:h-[542px] h-[480px] rounded-2xl overflow-hidden group cursor-pointer">
    <div
     className="absolute inset-0 bg-cover bg-center"
     style={{
      backgroundColor: "#F3F4F6",
      backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop')"
     }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-8">
     <div className="flex items-center justify-between">
      <div>
       <h3 className="text-3xl font-bold text-white mb-2">No Upcoming Events</h3>
       <p className="text-white/80 text-lg">Check back soon for updates</p>
      </div>
     </div>
    </div>
   </div>
  );
 }

 return (
  <Link href={`/events/${event.slug}`}>
   <div className="relative h-[542px] rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
    <div
     className="absolute inset-0 bg-cover bg-center"
     style={{
      backgroundColor: "#F3F4F6",
      backgroundImage: `url('${event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop'}')`
     }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-8">
     <div className="flex items-center justify-between">
      <div>
       <h3 className="text-3xl font-bold text-white mb-2">{event.title}</h3>
       {event.location && (
        <p className="text-white/80 text-lg">{event.location}</p>
       )}
      </div>
      <LinkIcon className="size-6 text-white" />
     </div>
    </div>
   </div>
  </Link>
 );
}
