"use client";

import { useState } from "react";

interface AboutCardsCarouselProps {
  images: string[];
}

export function AboutCardsCarousel({ images }: AboutCardsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="container mx-auto w-full mb-20 overflow-hidden">
      {/* Carousel Container */}
      <div className="relative px-4">
        <div className="overflow-hidden">
          {/* Width distribution: 12.5%, 37.5%, 37.5%, 12.5% */}
          <div className="flex gap-2">
            {images.map((image, i) => {
              // Calculate width based on position: first=12.5%, middle=37.5%, last=12.5%
              let width;
              if (i === 0) {
                width = "12.5%"; // First image - half
              } else if (i === images.length - 1) {
                width = "12.5%"; // Last image - half
              } else {
                width = "37.5%"; // Middle images - full
              }

              return (
                <div
                  key={i}
                  className="flex-shrink-0 relative h-[400px] overflow-hidden group cursor-pointer"
                  style={{ width }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundColor: "#D1D5DB",
                      backgroundImage: `url('${image}')`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
