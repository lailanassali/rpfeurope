"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Testimonial {
 text?: string;
 testimony?: string;
 name: string;
}

interface TestimonialCarouselProps {
 testimonials?: Testimonial[];
 autoplay?: boolean;
 interval?: number;
}

export function TestimonialCarousel({
 testimonials: propsTestimonials,
 autoplay = true,
 interval = 5000
}: TestimonialCarouselProps) {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [testimonials, setTestimonials] = useState<Testimonial[]>(propsTestimonials || []);
 const [isLoading, setIsLoading] = useState(!propsTestimonials);

 useEffect(() => {
  if (!propsTestimonials) {
   fetchTestimonials();
  }
 }, [propsTestimonials]);

 const [isHovered, setIsHovered] = useState(false);

 useEffect(() => {
  if (!autoplay || testimonials.length <= 1 || isHovered) return;

  const timer = setInterval(() => {
   setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, interval);

  return () => clearInterval(timer);
 }, [autoplay, interval, testimonials.length, isHovered]);

 async function fetchTestimonials() {
  try {
   const res = await fetch('/api/testimonials');
   if (!res.ok) throw new Error();
   const data = await res.json();
   setTestimonials(data);
  } catch (error) {
   console.error('Failed to fetch testimonials:', error);
  } finally {
   setIsLoading(false);
  }
 }

 const goToPrevious = () => {
  setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
 };

 const goToNext = () => {
  setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
 };

 if (isLoading) {
  return (
   <div className="bg-[#F7E7D826] py-24 rounded-3xl">
    <div className="container w-11/12 mx-auto px-4">
     <div className="bg-[#F7E7D8B2] p-16 flex justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
     </div>
    </div>
   </div>
  );
 }

 if (testimonials.length === 0) {
  return (
   <div className="bg-[#F7E7D826] py-24 rounded-3xl">
    <div className="container w-11/12 mx-auto px-4">
     <div className="bg-[#F7E7D8B2] p-16 text-center">
      <p className="text-gray-500">No testimonials available at the moment.</p>
     </div>
    </div>
   </div>
  );
 }

 const currentTestimonial = testimonials[currentIndex];
 const testimonialText = currentTestimonial.testimony || currentTestimonial.text || '';

 return (
  <div
   className="bg-[#F7E7D826] md:py-24 py-10"
   onMouseEnter={() => setIsHovered(true)}
   onMouseLeave={() => setIsHovered(false)}
  >
   <div className="container w-11/12 mx-auto px-4">
    <div className="bg-[#F7E7D8B2] md:p-16 p-10 rounded-3xl">
     {/* Testimonial Text */}
     <p className="text-black md:text-[18px] text-[16px] leading-relaxed">
      "{testimonialText}"
     </p>

     {/* Testifier Name */}
     <p className="text-[#1F172B] md:text-[24px] text-[18px] font-semibold mt-8">
      - {currentTestimonial.name}
     </p>

     {/* Navigation Controls */}
     <div className="flex md:justify-end justify-center gap-6 mt-[43px] md:mt-[83px]">
      <button
       onClick={goToPrevious}
       className="p-3 rounded-lg border-[0.5px] border-black bg-transparent hover:bg-black/10 transition-colors"
       aria-label="Previous testimonial"
      >
       <ArrowLeft className="size-6 text-black" />
      </button>
      <button
       onClick={goToNext}
       className="p-3 rounded-lg border-[0.5px] border-black bg-transparent hover:bg-black/10 transition-colors"
       aria-label="Next testimonial"
      >
       <ArrowRight className="size-6 text-black" />
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}
