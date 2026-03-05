"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  height?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  layout?: "single" | "multi";
  autoplay?: boolean;
}

export function ImageCarousel({
  images,
  height = 400,
  showControls = true,
  showIndicators = true,
  layout = "single",
  autoplay = true
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, images.length, isHovered]);

  if (layout === "multi" && !isMobile) {
    // Get images to display based on current index
    const getVisibleImages = () => {
      const visible = [];
      const limit = Math.min(images.length, 4);

      for (let i = 0; i < limit; i++) {
        const index = (currentIndex + i) % images.length;
        visible.push({ image: images[index], originalIndex: index });
      }
      return visible;
    };

    const visibleImages = getVisibleImages();

    return (
      <div
        className="relative w-full overflow-hidden"
        style={{ height: `${height}px` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-2 h-full">
          {visibleImages.map((item, i) => {
            // Calculate width based on total number of images
            let width;
            const totalCount = images.length;

            if (totalCount === 1) {
              width = "100%";
            } else if (totalCount === 2) {
              width = "50%";
            } else if (totalCount === 3) {
              width = "33.33%";
            } else {
              // 4 or more logic (existing)
              if (i === 0) {
                width = "12.5%";
              } else if (i === 3) {
                width = "12.5%";
              } else {
                width = "37.5%";
              }
            }

            return (
              <div
                key={item.originalIndex}
                className="shrink-0 relative overflow-hidden group"
                style={{ width, height: `${height}px` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundColor: "#D1D5DB",
                    backgroundImage: `url('${item.image}')`
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* Controls positioned on first and last images */}
        {showControls && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-lg border-2 border-white bg-transparent hover:bg-white/20 transition-colors shadow-lg z-10"
              aria-label="Previous"
            >
              <ArrowLeft className="size-6 text-white" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-lg border-2 border-white bg-transparent hover:bg-white/20 transition-colors shadow-lg z-10"
              aria-label="Next"
            >
              <ArrowRight className="size-6 text-white" />
            </button>
          </>
        )}
      </div>
    );
  }

  // Single image layout (original)
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{ height: `${height}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />

      {/* Controls */}
      {showControls && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full border-2 border-white bg-transparent hover:bg-white/20 transition-colors shadow-lg z-10"
            aria-label="Previous"
          >
            <ArrowLeft className="size-6 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full border-2 border-white bg-transparent hover:bg-white/20 transition-colors shadow-lg z-10"
            aria-label="Next"
          >
            <ArrowRight className="size-6 text-white" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${index === currentIndex
                ? "w-8 h-2 bg-white rounded-full"
                : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/75"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
