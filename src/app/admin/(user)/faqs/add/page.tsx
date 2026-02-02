"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { FormSelect } from '@/components/common/FormSelect';
import { RPFButton } from '@/components/common/RPFButton';

export default function AddFAQPage() {
 const router = useRouter();
 const [isLoading, setIsLoading] = useState(false);
 const [formData, setFormData] = useState({
  question: '',
  answer: '',
  category: 'General',
  order_index: 0,
 });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
   const res = await fetch('/api/admin/faqs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
   });
   if (!res.ok) throw new Error();
   toast.success('FAQ created');
   router.push('/admin/faqs');
   router.refresh();
  } catch (error) {
   toast.error('Failed to create');
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div>
   <div className="mb-6">
    <h1 className="text-2xl font-bold">Add FAQ</h1>
    <p className="text-gray-600 mt-1">Create a new frequently asked question</p>
   </div>

   <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
    <FormSelect
     label="Category"
     value={formData.category}
     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
     options={[
      { value: 'General', label: 'General' },
      { value: 'Baptism', label: 'Baptism' },
      { value: 'Counselling', label: 'Counselling' },
      { value: 'Prayers', label: 'Prayers' },
      { value: 'Serve', label: 'Serve' },
      { value: 'Mentorship', label: 'Mentorship' },
     ]}
     required
    />

    <FormTextarea
     label="Question"
     value={formData.question}
     onChange={(e) => setFormData({ ...formData, question: e.target.value })}
     rows={2}
     required
    />

    <FormTextarea
     label="Answer"
     value={formData.answer}
     onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
     rows={5}
     required
    />

    <FormInput
     label="Order"
     type="number"
     value={formData.order_index}
     onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
     placeholder="0"
    />

    <div className="flex gap-4 justify-end pt-4">
     <RPFButton type="button" onClick={() => router.back()} className="bg-gray-100 text-gray-700 px-6 py-2 h-auto">Cancel</RPFButton>
     <RPFButton type="submit" disabled={isLoading} className="bg-primary text-white px-6 py-2 h-auto">{isLoading ? 'Saving...' : 'Create'}</RPFButton>
    </div>
   </form>
  </div>
 );
}
