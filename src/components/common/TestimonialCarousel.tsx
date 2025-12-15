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
}

export function TestimonialCarousel({ testimonials: propsTestimonials }: TestimonialCarouselProps) {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [testimonials, setTestimonials] = useState<Testimonial[]>(propsTestimonials || []);
 const [isLoading, setIsLoading] = useState(!propsTestimonials);

 useEffect(() => {
  if (!propsTestimonials) {
   fetchTestimonials();
  }
 }, [propsTestimonials]);

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
  <div className="bg-[#F7E7D826] py-24">
   <div className="container w-11/12 mx-auto px-4">
    <div className="bg-[#F7E7D8B2] p-16 rounded-3xl">
     {/* Testimonial Text */}
     <p className="text-black text-[18px] leading-relaxed">
      "{testimonialText}"
     </p>

     {/* Testifier Name */}
     <p className="text-[#1F172B] text-[24px] font-semibold mt-8">
      - {currentTestimonial.name}
     </p>

     {/* Navigation Controls */}
     <div className="flex justify-end gap-6 mt-[83px]">
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
