"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LoveCarouselItem {
  heading: string;
  text: string;
  image: string;
  imageTitle?: string;
}

interface LoveCarouselProps {
  items: LoveCarouselItem[];
  showCarousel?: boolean;
  bgColor?: string;
  textColor?: "white" | "black";
  borderColor?: string;
}

export function LoveCarousel({
  items,
  showCarousel = true,
  bgColor = "#F7E7D84D",
  textColor = "black",
  borderColor = "white"
}: LoveCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < items.length - 1;

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

  const currentItem = items[currentIndex];
  const textColorClass = textColor === "white" ? "text-white" : "text-black";

  return (
    <div className="relative rounded-2xl border" style={{ backgroundColor: bgColor, borderColor }}>
      {/* Heading positioned half outside the box */}
      <div className="container mx-auto px-4 relative">
        <h2 className={`text-[48px] font-bold ${textColorClass} mb-0 relative z-10 inline-block pr-8 transform -translate-y-8`}>
          {currentItem.heading}
        </h2>
      </div>

      {/* Content Box */}
      <div className="pt-12 pb-24 px-[64px]">
        <div className="container mx-auto px-4">
          <div className="flex gap-12 items-center">
            {/* Text - 60% */}
            <div className="w-[60%]">
              <p className={`text-[18px] font-normal ${textColorClass} leading-relaxed whitespace-pre-line mb-12`}>
                {currentItem.text}
              </p>

              {/* Navigation Controls - only show if carousel is enabled */}
              {showCarousel && items.length > 1 && (
                <div className="flex gap-3">
                  <button
                    onClick={goToPrevious}
                    disabled={!canGoPrevious}
                    className={cn(
                      "p-3 rounded-[12px] border transition-colors",
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
              )}
            </div>
            {/* Image - 45% */}
            <div className="w-[45%]">
              {currentItem.imageTitle && (
                <h3 className={`text-[32px] font-bold ${textColorClass} mb-4`}>{currentItem.imageTitle}</h3>
              )}
              <div className="relative h-[478px] overflow-hidden rounded-lg">
                <Image
                  src={currentItem.image}
                  alt={currentItem.heading}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
