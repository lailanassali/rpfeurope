"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AboutCardsCarouselProps {
  images: string[];
}

export function AboutCardsCarousel({ images }: AboutCardsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkMobile();

    // Add listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="container mx-auto w-full mb-20 overflow-hidden">
      {/* Carousel Container */}
      <div className="relative px-4">
        <div className="overflow-hidden">
          <div className="flex gap-2 relative">
            {isMobile ? (
              // Mobile View - Single Slide
              <div className="w-full relative h-[400px] overflow-hidden rounded-lg">
                {/* Navigation Buttons for Mobile */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-black transition-colors"
                  aria-label="Previous"
                >
                  <ArrowLeft className="size-5" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-black transition-colors"
                  aria-label="Next"
                >
                  <ArrowRight className="size-5" />
                </button>

                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                  style={{
                    backgroundColor: "#D1D5DB",
                    backgroundImage: `url('${images[currentIndex]}')`
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              </div>
            ) : (
              // Desktop View - Strip Layout
              images.map((image, i) => {
                // Calculate width based on total number of images
                let width;
                const count = images.length;

                if (count === 1) {
                  width = "100%";
                } else if (count === 2) {
                  width = "50%";
                } else if (count === 3) {
                  width = "33.33%";
                } else {
                  // For 4 or more images, use the division formula
                  if (i === 0) {
                    width = "12.5%"; // First image - half
                  } else if (i === count - 1) {
                    width = "12.5%"; // Last image - half
                  } else {
                    width = "37.5%"; // Middle images - full
                  }
                }

                return (
                  <div
                    key={i}
                    className="shrink-0 relative h-[400px] overflow-hidden group cursor-pointer rounded-lg"
                    style={{ width }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundColor: "#D1D5DB",
                        backgroundImage: `url('${image}')`
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
