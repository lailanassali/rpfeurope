"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items?: FAQItem[];
  category?: string;
}

export function FAQAccordion({ items: propsItems, category = 'General' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [items, setItems] = useState<FAQItem[]>(propsItems || []);
  const [isLoading, setIsLoading] = useState(!propsItems);

  useEffect(() => {
    if (!propsItems) {
      fetchFAQs();
    }
  }, [propsItems, category]);

  async function fetchFAQs() {
    try {
      const params = category ? `?category=${encodeURIComponent(category)}` : '';
      const res = await fetch(`/api/faqs${params}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No FAQs available at the moment.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[#D9D9D9] rounded-[12px] overflow-hidden transition-all"
          style={{ minHeight: openIndex === index ? "auto" : "88px" }}
        >
          <button
            onClick={() => handleToggle(index)}
            className="w-full p-8 flex items-center justify-between text-left  transition-colors"
          >
            <span className="text-base text-black pr-4">
              {item.question}
            </span>
            {openIndex === index ? (
              <ChevronUp className="size-6 text-black flexShrink-0" />
            ) : (
              <ChevronDown className="size-6 text-black flexShrink-0" />
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
