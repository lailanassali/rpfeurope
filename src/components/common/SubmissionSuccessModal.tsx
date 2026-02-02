"use client";

import { Check } from 'lucide-react';
import { useEffect } from 'react';

interface SubmissionSuccessModalProps {
 isOpen: boolean;
 onClose: () => void;
 title?: string;
 message?: string;
}

export function SubmissionSuccessModal({
 isOpen,
 onClose,
 title = "Submission Recorded",
 message = "Thank you for your details. Your submission has been successfully received and recorded in our system. A member of our team will review the information and will be in touch with you shortly if further action is required."
}: SubmissionSuccessModalProps) {

 useEffect(() => {
  if (isOpen) {
   document.body.style.overflow = 'hidden';
  } else {
   document.body.style.overflow = 'unset';
  }
  return () => {
   document.body.style.overflow = 'unset';
  };
 }, [isOpen]);

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 z-100 overflow-y-auto">
   {/* Backdrop with blur */}
   <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
    onClick={onClose}
   />

   {/* Modal */}
   <div className="flex min-h-full items-center justify-center p-4">
    <div
     className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all flex flex-col items-center text-center animate-in fade-in zoom-in duration-300"
     onClick={(e) => e.stopPropagation()}
    >
     {/* Success Icon */}
     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
      <Check className="size-8 text-green-600" strokeWidth={3} />
     </div>

     {/* Content */}
     <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif playfair-display">
      {title}
     </h3>

     <p className="text-gray-600 leading-relaxed mb-8">
      {message}
     </p>

     {/* Action Button */}
     <button
      onClick={onClose}
      className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors duration-200 outline-none focus:ring-2 focus:ring-primary/20"
     >
      Close
     </button>
    </div>
   </div>
  </div>
 );
}
