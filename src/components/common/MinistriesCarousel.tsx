"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ChhButton } from "./ChhButton";

interface MinistriesCarouselProps {
 items: Array<{
  title: string;
  href: string;
  image: string;
 }>;
 autoplay?: boolean;
}

export function MinistriesCarousel({ items, autoplay = false }: MinistriesCarouselProps) {
 const [activeIndex, setActiveIndex] = useState(0);

 // Autoplay functionality
 useEffect(() => {
  if (!autoplay) return;

  const interval = setInterval(() => {
   setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, 3000); // Change slide every 3 seconds

  return () => clearInterval(interval);
 }, [autoplay, items.length]);

 const goToPrevious = () => {
  setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
 };

 const goToNext = () => {
  setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
 };

 const goToSlide = (index: number) => {
  setActiveIndex(index);
 };

 return (
  <div className="flex gap-[32px] items-center justify-center">
   <button
    onClick={goToPrevious}
    className="p-3 rounded-[12px] border-[0.5px] border-[#a2a2a2] text-[#a2a2a2] hover:bg-[#a2a2a2] hover:text-white transition-colors"
    aria-label="Previous slide"
   >
    <ArrowLeft className="size-5" />
   </button>
   <div className="flex-1 max-w-5xl">

    {/* Carousel Container */}
    <div className="relative h-[500px] md:h-[550px] rounded-3xl overflow-hidden">
     {/* Background Image */}
     <div
      className="absolute inset-0 bg-cover bg-center transition-all duration-500"
      style={{
       backgroundColor: "#E5E7EB",
       backgroundImage: `url('${items[activeIndex].image}')`
      }}
     />
     {/* Dark Overlay */}
     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

     {/* Content at bottom-left */}
     <div className="absolute bottom-0 left-0 p-8 md:p-12">
      <h3 className="text-[24px] font-semibold text-white mb-[16px]">
       {items[activeIndex].title}
      </h3>
      <ChhButton
       className='bg-transparent text-white hover:bg-primary/90 font-semibold h-[54px] px-[24px] py-[12px] text-[18px] min-w-[240px] rounded-[4px]'
       isOutline
      >
       <Link href={items[activeIndex].href} className="flex items-center gap-2">
        <span>Explore Fellowship</span>
        <ArrowRight className="size-5" />
       </Link>
      </ChhButton>
     </div>
    </div>

    {/* Progress Indicators */}
    <div className="flex gap-2 justify-center mt-6 mb-6">
     {items.map((_, index) => (
      <button
       key={index}
       onClick={() => goToSlide(index)}
       className={`transition-all duration-300 ${index === activeIndex
        ? 'w-12 h-3 bg-primary rounded-full'
        : 'w-3 h-3 bg-primary/30 rounded-full hover:bg-primary/50'
        }`}
       aria-label={`Go to slide ${index + 1}`}
      />
     ))}
    </div>

   </div>
   <button
    onClick={goToNext}
    className="p-3 rounded-[12px] border-[0.5px] border-[#a2a2a2] text-[#a2a2a2] hover:bg-[#a2a2a2] hover:text-white transition-colors"
    aria-label="Next slide"
   >
    <ArrowRight className="size-5" />
   </button>
  </div>
 );
}
