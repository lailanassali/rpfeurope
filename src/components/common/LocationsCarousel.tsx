"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationItem {
  location: string;
  image: string;
}

interface LocationsCarouselProps {
  items: LocationItem[];
  rows?: 1 | 2;
  showIndicators?: boolean;
  autoplay?: boolean;
}

export function LocationsCarousel({
  items,
  rows = 2,
  showIndicators = true,
  autoplay = false
}: LocationsCarouselProps) {
  // Split items evenly across rows
  const itemsPerRow = Math.ceil(items.length / rows);
  const rowsData = Array.from({ length: rows }, (_, rowIndex) => {
    const start = rowIndex * itemsPerRow;
    const end = start + itemsPerRow;
    return items.slice(start, end);
  });

  // Independent state for each row
  const [rowIndices, setRowIndices] = useState<number[]>(Array(rows).fill(0));

  const itemsToShow = 4; // Show 4 items at a time per row

  // Autoplay functionality for all rows
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setRowIndices(prev => {
        return prev.map((currentIndex, rowIndex) => {
          const maxIndex = Math.max(0, rowsData[rowIndex].length - itemsToShow);
          return currentIndex >= maxIndex ? 0 : currentIndex + 1;
        });
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [autoplay, rowsData, itemsToShow]);

  const goToPrevious = (rowIndex: number) => {
    setRowIndices(prev => {
      const newIndices = [...prev];
      if (newIndices[rowIndex] > 0) {
        newIndices[rowIndex] = newIndices[rowIndex] - 1;
      }
      return newIndices;
    });
  };

  const goToNext = (rowIndex: number) => {
    setRowIndices(prev => {
      const newIndices = [...prev];
      const maxIndex = Math.max(0, rowsData[rowIndex].length - itemsToShow);
      if (newIndices[rowIndex] < maxIndex) {
        newIndices[rowIndex] = newIndices[rowIndex] + 1;
      }
      return newIndices;
    });
  };

  const goToPage = (rowIndex: number, pageIndex: number) => {
    setRowIndices(prev => {
      const newIndices = [...prev];
      newIndices[rowIndex] = pageIndex;
      return newIndices;
    });
  };

  return (
    <div className="w-full">
      <div className="space-y-3">
        {rowsData.map((rowItems, rowIndex) => {
          const currentIndex = rowIndices[rowIndex];
          const totalPages = Math.max(1, rowItems.length - itemsToShow + 1);
          const visibleItems = rowItems.slice(currentIndex, currentIndex + itemsToShow);
          const canGoPrevious = currentIndex > 0;
          const canGoNext = currentIndex < totalPages - 1;

          return (
            <div key={`row-${rowIndex}`} className="relative">
              {/* Row Container */}
              <div className="grid grid-cols-4 gap-3">
                {visibleItems.map((item, index) => (
                  <div
                    key={`row${rowIndex}-item${index}`}
                    className="relative h-[467px] overflow-hidden group cursor-pointer"
                    style={{ borderRadius: '4px' }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundColor: "#D1D5DB",
                        backgroundImage: `url('${item.image}')`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6" style={{ backgroundColor: "#0000004D" }}>
                      <p className="text-white text-lg font-semibold">{item.location}</p>
                    </div>

                    {/* Navigation arrows - only on first and last visible items */}
                    {index === 0 && canGoPrevious && (
                      <button
                        onClick={() => goToPrevious(rowIndex)}
                        className={cn(
                          "absolute left-4 top-1/2 -translate-y-1/2 z-20",
                          "p-3 rounded-[12px] border-[0.5px] transition-colors bg-white backdrop-blur-sm",
                          "border-primary text-primary hover:bg-white hover:text-primary"
                        )}
                        aria-label="Previous"
                      >
                        <ArrowLeft className="size-5" />
                      </button>
                    )}

                    {index === visibleItems.length - 1 && canGoNext && (
                      <button
                        onClick={() => goToNext(rowIndex)}
                        className={cn(
                          "absolute right-4 top-1/2 -translate-y-1/2 z-20",
                          "p-3 rounded-[12px] border-[0.5px] transition-colors bg-white backdrop-blur-sm",
                          "border-primary text-primary hover:bg-white hover:text-primary"
                        )}
                        aria-label="Next"
                      >
                        <ArrowRight className="size-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Progress Indicators for this row */}
              {showIndicators && totalPages > 1 && (
                <div className="flex gap-2 justify-center mt-6">
                  {Array.from({ length: totalPages }).map((_, pageIndex) => (
                    <button
                      key={pageIndex}
                      onClick={() => goToPage(rowIndex, pageIndex)}
                      className={cn(
                        "transition-all duration-300",
                        pageIndex === currentIndex
                          ? "w-12 h-3 bg-primary rounded-full"
                          : "w-3 h-3 bg-primary/30 rounded-full hover:bg-primary/50"
                      )}
                      aria-label={`Go to page ${pageIndex + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
