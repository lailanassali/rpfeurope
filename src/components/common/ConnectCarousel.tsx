"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardComponent } from "./CardComponent";

interface ConnectItem {
  title: string;
  description: string;
  image: string;
  linkHref?: string;
  linkText?: string;
}

interface ConnectCarouselProps {
  items: ConnectItem[];
  autoplay?: boolean;
}

export function ConnectCarousel({ items, autoplay = true }: ConnectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const itemsToShow = 3; // Show 3 items at a time

  const totalPages = Math.max(1, items.length - itemsToShow + 1);
  const visibleItems = items.slice(currentIndex, currentIndex + itemsToShow);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < totalPages - 1;

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = totalPages - 1;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [autoplay, totalPages, isHovered]);

  const goToPrevious = () => {
    if (canGoPrevious) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div
      className="w-full md:mt-14 mt-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Arrows - Aligned to extreme left */}
      <div className="flex justify-end gap-3 md:mb-12 mb-6">
        <button
          onClick={goToPrevious}
          disabled={!canGoPrevious}
          className={cn(
            "p-3 rounded-[12px] border-[0.5px] transition-colors",
            canGoPrevious
              ? "border-primary text-primary hover:bg-primary hover:text-white"
              : "border-gray-300 text-gray-300 cursor-not-allowed"
          )}
          aria-label="Previous"
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          onClick={goToNext}
          disabled={!canGoNext}
          className={cn(
            "p-3 rounded-[12px] border-[0.5px] transition-colors",
            canGoNext
              ? "border-primary text-primary hover:bg-primary hover:text-white"
              : "border-gray-300 text-gray-300 cursor-not-allowed"
          )}
          aria-label="Next"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>

      {/* Carousel Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {visibleItems.map((item, i) => (
          <CardComponent
            key={i}
            image={item.image}
            title={item.title}
            description={item.description}
            descriptionClassName="line-clamp-3"
            linkHref={item.linkHref}
            linkText='Learn more'
          />
        ))}
      </div>
    </div>
  );
}
