"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="mx-auto w-full mb-20 overflow-hidden">
      {/* Carousel Container */}
      <div className="relative">
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
              // Desktop View
              <>
                {images.length > 4 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 z-20",
                        "p-3 rounded-[12px] border-[0.5px] transition-colors bg-transparent backdrop-blur-sm shadow-sm",
                        "border-white text-white hover:bg-white/10"
                      )}
                      aria-label="Previous"
                    >
                      <ArrowLeft className="size-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 z-20",
                        "p-3 rounded-[12px] border-[0.5px] transition-colors bg-transparent backdrop-blur-sm shadow-sm",
                        "border-white text-white hover:bg-white/10"
                      )}
                      aria-label="Next"
                    >
                      <ArrowRight className="size-5" />
                    </button>
                  </>
                )}

                {(images.length >= 4
                  ? [0, 1, 2, 3].map(offset => {
                    const index = (currentIndex + offset) % images.length;
                    return { url: images[index], originalIndex: index, i: offset };
                  })
                  : images.map((url, i) => ({ url, originalIndex: i, i }))
                ).map(({ url, originalIndex, i }) => {
                  let width;
                  const visibleCount = images.length >= 4 ? 4 : images.length;

                  if (visibleCount === 1) width = "100%";
                  else if (visibleCount === 2) width = "50%";
                  else if (visibleCount === 3) width = "33.33%";
                  else {
                    // visibleCount is 4
                    if (i === 0) width = "12.5%"; // First - half
                    else if (i === 3) width = "12.5%"; // Last - half
                    else width = "37.5%"; // Middle - full
                  }

                  return (
                    <div
                      key={`${originalIndex}-${i}`}
                      className={cn(
                        "shrink-0 relative h-[400px] overflow-hidden group cursor-pointer rounded-lg",
                        visibleCount >= 4 && i === 0 && "rounded-l-none",
                        visibleCount >= 4 && i === 3 && "rounded-r-none"
                      )}
                      style={{ width }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundColor: "#D1D5DB",
                          backgroundImage: `url('${url}')`
                        }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
