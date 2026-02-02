"use client";

import { useState } from "react";
import { RPFButton } from "@/components/common/RPFButton";
import { EventRegistrationModal } from "@/components/EventRegistrationModal";

interface EventRegistrationButtonProps {
 eventSlug: string;
 eventTitle: string;
}

export function EventRegistrationButton({ eventSlug, eventTitle }: EventRegistrationButtonProps) {
 const [isModalOpen, setIsModalOpen] = useState(false);

 return (
  <>
   <RPFButton
    onClick={() => setIsModalOpen(true)}
    className="w-full md:mt-12 mt-6 bg-primary text-white hover:bg-primary/90 h-[54px] rounded-[4px]"
   >
    Register for event
   </RPFButton>

   <EventRegistrationModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    eventSlug={eventSlug}
    eventTitle={eventTitle}
   />
  </>
 );
}
