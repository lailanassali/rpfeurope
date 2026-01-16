"use client";

import { useRouter } from "next/navigation";
import { ArrowButtonIcon } from "@/components/icons/ArrowButtonIcon";

interface ServiceLocationCardProps {
  slug: string;
  image: string;
  title: string;
  services: string[];
  address: string;
  mapLink: string;
  howToFindUs?: string;
  distance?: number; // Distance in miles
}

export function ServiceLocationCard({
  slug,
  image,
  title,
  services,
  address,
  mapLink,
  howToFindUs,
  distance
}: ServiceLocationCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/join-service/${slug}`);
  };

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <img
          src={image || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[#6F5299] opacity-0 group-hover:opacity-95 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
          <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
          <p className="text-white text-sm">
            {services && services.length > 0 ? services.join(' • ') : 'Join us for Sunday Service'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex justify-between items-start gap-4">
        {/* Left Side: Title, Services, Address, How to Find Us */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-[20px] font-semibold text-black">{title}</h3>

          {/* Display all services */}
          {services && services.length > 0 ? (
            <div className="space-y-1">
              {services.map((service, idx) => (
                <p key={idx} className="text-[12px] font-normal text-black/70">
                  {service}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-[12px] font-normal text-black/70">No services listed</p>
          )}

          <p className="text-[14px] font-normal text-black/80">{address}</p>

          {/* Distance - shown when provided */}
          {distance !== undefined && (
            <p className="text-[12px] font-semibold text-primary">
              {distance} miles away
            </p>
          )}

          {/* How to Find Us - shown after address for campus locations */}
          {howToFindUs && (
            <p className="text-[12px] font-normal text-black/70 mb-5">
              {howToFindUs}
            </p>
          )}
        </div>

        {/* Right Side: Action Icon */}
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="hover:opacity-80 transition-opacity shrink-0"
          aria-label="Get directions"
        >
          <ArrowButtonIcon
            bgColor="#F4F1F9"
            borderColor="#6F5299"
            arrowColor="#6F5299"
          />
        </a>
      </div>
    </div>
  );
}
