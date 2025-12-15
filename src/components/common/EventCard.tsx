"use client";

import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin } from "lucide-react";

interface EventCardProps {
 slug: string;
 image?: string;
 title: string;
 category: string;
 date: string;
 time: string;
 venue: string;
}

export function EventCard({
 slug,
 image,
 title,
 category,
 date,
 time,
 venue
}: EventCardProps) {
 const router = useRouter();

 const handleClick = () => {
  router.push(`/events/${slug}`);
 };

 return (
  <div
   onClick={handleClick}
   className="cursor-pointer overflow-hidden hover:shadow-lg transition-shadow p-4"
  >
   {/* Image or Placeholder */}
   <div className="w-full h-[275px] bg-gray-200 rounded-lg overflow-hidden mb-6">
    {image ? (
     <img
      src={image}
      alt={title}
      className="w-full h-full object-cover"
     />
    ) : (
     <div className="w-full h-full flex items-center justify-center text-gray-400">
      No Image
     </div>
    )}
   </div>

   {/* Title */}
   <h3 className="text-[18px] font-semibold text-black mt-6">{title}</h3>

   {/* Category Badge */}
   <div className="mt-5 mb-5">
    <span className="inline-block bg-[#D9D9D9] text-black text-[12px] font-medium rounded px-[10px] py-[6px]">
     {category}
    </span>
   </div>

   {/* Date, Time, Venue */}
   <div className="space-y-2">
    <div className="flex items-center gap-2 pb-2">
     <Calendar className="size-6 text-black" />
     <span className="text-[14px] text-black">{date}</span>
    </div>

    <div className="flex items-center gap-2 pb-2">
     <Clock className="size-6 text-black" />
     <span className="text-[14px] text-black">{time}</span>
    </div>

    <div className="flex items-center gap-2 pb-2">
     <MapPin className="size-6 text-black" />
     <span className="text-[14px] text-black">{venue}</span>
    </div>
   </div>
  </div>
 );
}
