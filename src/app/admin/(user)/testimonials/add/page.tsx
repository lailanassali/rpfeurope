"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { ChhButton } from '@/components/common/ChhButton';

export default function AddTestimonialPage() {
 const router = useRouter();
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [formData, setFormData] = useState({
  name: '',
  testimony: '',
  is_approved: false,
 });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
   const res = await fetch('/api/admin/testimonials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
   });
   if (!res.ok) throw new Error();
   toast.success('Testimonial created');
   router.push('/admin/testimonials');
   router.refresh();
  } catch (error) {
   toast.error('Failed to create');
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <div>
   <div className="mb-6">
    <h1 className="text-2xl font-bold">Add Testimonial</h1>
   </div>

   <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 space-y-4 max-w-2xl">
    <FormInput
     label="Name"
     value={formData.name}
     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
     required
    />
    <FormTextarea
     label="Testimony"
     value={formData.testimony}
     onChange={(e) => setFormData({ ...formData, testimony: e.target.value })}
     rows={6}
     required
    />

    <div className="flex items-center gap-3">
     <input
      type="checkbox"
      id="is_approved"
      checked={formData.is_approved}
      onChange={(e) => setFormData({ ...formData, is_approved: e.target.checked })}
      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
     />
     <label htmlFor="is_approved" className="text-sm font-medium text-gray-700">
      Approve immediately (visible on website)
     </label>
    </div>

    <div className="flex gap-4 justify-end pt-4">
     <ChhButton type="button" onClick={() => router.back()} className="bg-gray-100 text-gray-700 px-6 py-2 h-auto">
      Cancel
     </ChhButton>
     <ChhButton type="submit" disabled={isSubmitting} className="bg-primary text-white px-6 py-2 h-auto">
      {isSubmitting ? 'Creating...' : 'Create'}
     </ChhButton>
    </div>
   </form>
  </div>
 );
}
