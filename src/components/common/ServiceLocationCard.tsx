"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface ServiceLocationCardProps {
  slug: string;
  image: string;
  title: string;
  serviceType: string;
  date: string;
  address: string;
  mapLink: string;
}

export function ServiceLocationCard({
  slug,
  image,
  title,
  serviceType,
  date,
  address,
  mapLink
}: ServiceLocationCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/join-service/${slug}`);
  };

  return (
    <div 
      className="group cursor-pointer overflow-hidden rounded-lg"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-[20px] font-semibold text-black mb-2">{title}</h3>
        <p className="text-[12px] font-normal text-black/70 mb-1">{serviceType}</p>
        <p className="text-[12px] font-normal text-black/70 mb-3">{date}</p>
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-normal text-black/80 flex-1">{address}</p>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Get directions"
          >
            <ArrowRight className="size-5 text-primary" />
          </a>
        </div>
      </div>
    </div>
  );
}
