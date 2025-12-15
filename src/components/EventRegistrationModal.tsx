"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Modal } from '@/components/admin/Modal';
import { FormInput } from '@/components/common/FormInput';
import { ChhButton } from '@/components/common/ChhButton';

interface EventRegistrationModalProps {
 isOpen: boolean;
 onClose: () => void;
 eventSlug: string;
 eventTitle: string;
}

export function EventRegistrationModal({ isOpen, onClose, eventSlug, eventTitle }: EventRegistrationModalProps) {
 const [isLoading, setIsLoading] = useState(false);
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
 });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
   const response = await fetch(`/api/events/${eventSlug}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
   });

   if (!response.ok) throw new Error('Registration failed');

   toast.success('Successfully registered for the event!');
   setFormData({ name: '', email: '', phone: '' });
   onClose();
  } catch (error) {
   console.error('Registration error:', error);
   toast.error('Failed to register. Please try again.');
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <Modal isOpen={isOpen} onClose={onClose} title={`Register for ${eventTitle}`} maxWidth="md">
   <form onSubmit={handleSubmit} className="space-y-4">
    <p className="text-gray-600 mb-4">Fill in your details to register for this event.</p>

    <FormInput
     label="Full Name"
     value={formData.name}
     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
     required
     disabled={isLoading}
    />

    <FormInput
     label="Email Address"
     type="email"
     value={formData.email}
     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
     required
     disabled={isLoading}
    />

    <FormInput
     label="Phone Number"
     type="tel"
     value={formData.phone}
     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
     required
     disabled={isLoading}
    />

    <div className="flex gap-3 justify-end pt-4">
     <ChhButton
      type="button"
      onClick={onClose}
      disabled={isLoading}
      className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-2 h-auto"
     >
      Cancel
     </ChhButton>
     <ChhButton
      type="submit"
      disabled={isLoading}
      className="bg-primary text-white hover:bg-primary/90 px-6 py-2 h-auto"
     >
      {isLoading ? 'Registering...' : 'Register'}
     </ChhButton>
    </div>
   </form>
  </Modal>
 );
}
