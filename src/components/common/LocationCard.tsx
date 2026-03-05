"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LocationCardProps {
 location: string;
 image: string;
 href?: string;
 description?: string;
}

export function LocationCard({ location, image, href = "/locations", description }: LocationCardProps) {
 const [isExpanded, setIsExpanded] = useState(false);
 const router = useRouter();

 return (
  <div
   onClick={() => router.push(href)}
   className="relative md:h-[467px] h-[300px] overflow-hidden group cursor-pointer block"
   style={{ borderRadius: '4px' }}
  >
   <div
    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
    style={{
     backgroundColor: "#D1D5DB",
     backgroundImage: `url('${image}')`
    }}
   />
   <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent md:group-hover:opacity-0 transition-opacity duration-300" />

   <div
    className={`absolute bottom-0 left-0 right-0 p-6 md:group-hover:opacity-0 transition-all duration-300 flex flex-col justify-end ${isExpanded ? 'top-0 overflow-y-auto' : ''}`}
    style={{ backgroundColor: isExpanded ? 'rgba(0,0,0,0.85)' : "#0000004D" }}
   >
    <div className="mt-auto">
     <p className="text-white text-lg font-semibold">{location}</p>
     {description && (
      <div className="md:hidden">
       <p className={`text-white/90 text-sm mt-2 transition-all ${isExpanded ? '' : 'line-clamp-3'}`}>
        {description}
       </p>
       <button
        onClick={(e) => {
         e.preventDefault();
         e.stopPropagation();
         setIsExpanded(!isExpanded);
        }}
        className="text-white text-xs font-semibold mt-3 underline relative z-10"
       >
        {isExpanded ? "Show less" : "Read more"}
       </button>
      </div>
     )}
    </div>
   </div>

   {/* Hover Overlay */}
   {description && <div className="absolute inset-0 bg-[#6F5299] opacity-0 md:group-hover:opacity-95 transition-opacity duration-300 hidden md:flex flex-col items-start justify-center p-6 text-left">
    <h4 className="text-white text-xl font-bold mb-3">{location}</h4>
    <p className="text-white text-base">
     {description}
    </p>
   </div>}
  </div>
 );
}
