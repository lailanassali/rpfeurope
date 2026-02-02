"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { RPFButton } from '@/components/common/RPFButton';

export default function EditTestimonialPage() {
 const router = useRouter();
 const params = useParams();
 const id = params?.id as string;
 const [isLoading, setIsLoading] = useState(false);
 const [isFetching, setIsFetching] = useState(true);
 const [formData, setFormData] = useState({
  name: '',
  testimony: '',
  is_approved: false,
 });

 useEffect(() => {
  if (id) fetchTestimonial();
 }, [id]);

 async function fetchTestimonial() {
  try {
   const res = await fetch(`/api/admin/testimonials/${id}`);
   if (!res.ok) throw new Error();
   const data = await res.json();
   setFormData({
    name: data.name || '',
    testimony: data.testimony || '',
    is_approved: data.is_approved || false,
   });
  } catch (error) {
   toast.error('Failed to load testimonial');
   router.push('/admin/testimonials');
  } finally {
   setIsFetching(false);
  }
 }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
   const res = await fetch(`/api/admin/testimonials/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
   });
   if (!res.ok) throw new Error();
   toast.success('Testimonial updated');
   router.push('/admin/testimonials');
   router.refresh();
  } catch (error) {
   toast.error('Failed to update');
  } finally {
   setIsLoading(false);
  }
 };

 if (isFetching) {
  return (
   <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
   </div>
  );
 }

 return (
  <div>
   <div className="mb-6">
    <h1 className="text-2xl font-bold">Edit Testimonial</h1>
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
      Approved (visible on website)
     </label>
    </div>

    <div className="flex gap-4 justify-end pt-4">
     <RPFButton type="button" onClick={() => router.back()} className="bg-gray-100 text-gray-700 px-6 py-2 h-auto">
      Cancel
     </RPFButton>
     <RPFButton type="submit" disabled={isLoading} className="bg-primary text-white px-6 py-2 h-auto">
      {isLoading ? 'Updating...' : 'Update'}
     </RPFButton>
    </div>
   </form>
  </div>
 );
}
