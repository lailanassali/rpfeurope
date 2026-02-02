"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { FormSelect } from '@/components/common/FormSelect';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { RPFButton } from '@/components/common/RPFButton';

export default function EditResourcePage() {
 const router = useRouter();
 const params = useParams();
 const id = params?.id as string;
 const [isLoading, setIsLoading] = useState(false);
 const [isFetching, setIsFetching] = useState(true);
 const [formData, setFormData] = useState({
  title: '',
  description: '',
  link_text: '',
  link_url: '',
  image_url: '',
  category: '',
  badge_text: '',
  schedule: '',
  author: '',
  volume: '',
 });

 useEffect(() => {
  if (id) fetchResource();
 }, [id]);

 async function fetchResource() {
  try {
   const res = await fetch(`/api/admin/resources/${id}`);
   if (!res.ok) throw new Error();
   const data = await res.json();
   setFormData({
    title: data.title || '',
    description: data.description || '',
    link_text: data.link_text || '',
    link_url: data.link_url || '',
    image_url: data.image_url || '',
    category: data.category || '',
    badge_text: data.badge_text || '',
    schedule: data.schedule || '',
    author: data.author || '',
    volume: data.volume || '',
   });
  } catch (error) {
   toast.error('Failed to load resource');
   router.push('/admin/resources');
  } finally {
   setIsFetching(false);
  }
 }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
   const res = await fetch(`/api/admin/resources/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
   });
   if (!res.ok) throw new Error();
   toast.success('Resource updated');
   router.push('/admin/resources');
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
    <h1 className="text-2xl font-bold">Edit Resource</h1>
   </div>

   <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
    <FormInput label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
    <FormTextarea label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
    <ImageUpload label="Resource Image" value={formData.image_url} onChange={(url) => setFormData({ ...formData, image_url: url })} />
    <div className="grid grid-cols-2 gap-4">
     <FormInput label="Link Text" value={formData.link_text} onChange={(e) => setFormData({ ...formData, link_text: e.target.value })} placeholder="e.g., Read More" />
     <FormInput label="Link URL" value={formData.link_url} onChange={(e) => setFormData({ ...formData, link_url: e.target.value })} placeholder="https://" />
    </div>

    <FormSelect
     label="Category"
     value={formData.category}
     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
     options={[
      { value: '', label: 'Select Category' },
      { value: 'bms_stream', label: 'BMS Stream' },
      { value: 'devotional', label: 'Devotional' },
     ]}
     required
    />

    {/* BMS Stream specific fields */}
    {formData.category === 'bms_stream' && (
     <FormInput
      label="Schedule"
      value={formData.schedule}
      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
      placeholder="e.g., Monday – Friday, 7:00–8:00 AM (GMT)"
     />
    )}

    {/* Devotional specific fields */}
    {formData.category === 'devotional' && (
     <>
      <FormInput
       label="Author"
       value={formData.author}
       onChange={(e) => setFormData({ ...formData, author: e.target.value })}
       placeholder="e.g., By CHH Teaching Team"
      />
      <FormInput
       label="Volume"
       value={formData.volume}
       onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
       placeholder="e.g., Volume 1"
      />
     </>
    )}

    <div className="grid grid-cols-2 gap-4">
     <FormInput label="Badge Text (Optional)" value={formData.badge_text} onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })} />
    </div>

    <div className="flex gap-4 justify-end pt-4">
     <RPFButton type="button" onClick={() => router.back()} className="bg-gray-100 text-gray-700 px-6 py-2 h-auto">Cancel</RPFButton>
     <RPFButton type="submit" disabled={isLoading} className="bg-primary text-white px-6 py-2 h-auto">{isLoading ? 'Saving...' : 'Update'}</RPFButton>
    </div>
   </form>
  </div>
 );
}
