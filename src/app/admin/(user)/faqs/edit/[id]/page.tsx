"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { FormSelect } from '@/components/common/FormSelect';
import { ChhButton } from '@/components/common/ChhButton';

export default function EditFAQPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    order_index: 0,
  });

  useEffect(() => {
    if (id) fetchFAQ();
  }, [id]);

  async function fetchFAQ() {
    try {
      const res = await fetch(`/api/admin/faqs/${id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFormData({
        question: data.question || '',
        answer: data.answer || '',
        category: data.category || 'General',
        order_index: data.order_index || 0,
      });
    } catch (error) {
      toast.error('Failed to load FAQ');
      router.push('/admin/faqs');
    } finally {
      setIsFetching(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      toast.success('FAQ updated');
      router.push('/admin/faqs');
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
        <h1 className="text-2xl font-bold">Edit FAQ</h1>
        <p className="text-gray-600 mt-1">Update frequently asked question</p>
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
          <ChhButton type="button" onClick={() => router.back()} className="bg-gray-100 text-gray-700 px-6 py-2 h-auto">Cancel</ChhButton>
          <ChhButton type="submit" disabled={isLoading} className="bg-primary text-white px-6 py-2 h-auto">{isLoading ? 'Saving...' : 'Update'}</ChhButton>
        </div>
      </form>
    </div>
  );
}
