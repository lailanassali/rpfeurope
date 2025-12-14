"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
 question: string;
 answer: string;
}

interface FAQAccordionProps {
 items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
 const [openIndex, setOpenIndex] = useState<number | null>(null);

 const toggleItem = (index: number) => {
  setOpenIndex(openIndex === index ? null : index);
 };

 return (
  <div className="space-y-4 py-[72px]">
   {items.map((item, index) => (
    <div
     key={index}
     className="border border-[#D9D9D9] rounded-[12px] overflow-hidden transition-all"
     style={{ minHeight: openIndex === index ? "auto" : "88px" }}
    >
     <button
      onClick={() => toggleItem(index)}
      className="w-full p-8 flex items-center justify-between text-left  transition-colors"
     >
      <span className="text-base text-black pr-4">
       {item.question}
      </span>
      {openIndex === index ? (
       <ChevronUp className="size-6 text-black flex-shrink-0" />
      ) : (
       <ChevronDown className="size-6 text-black flex-shrink-0" />
      )}
     </button>
     {openIndex === index && (
      <div className="px-8 pb-8">
       <p className="text-[16px] text-black/80 leading-relaxed">
        {item.answer}
       </p>
      </div>
     )}
    </div>
   ))}
  </div>
 );
}
