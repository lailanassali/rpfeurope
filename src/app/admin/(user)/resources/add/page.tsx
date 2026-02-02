"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { FormSelect } from '@/components/common/FormSelect';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { RPFButton } from '@/components/common/RPFButton';

export default function AddResourcePage() {
 const router = useRouter();
 const [isLoading, setIsLoading] = useState(false);
 const [formData, setFormData] = useState({
  title: '',
  description: '',
  link_text: '',
  link_url: '',
  image_url: '',
  category: '',
  badge_text: '',
  badge_color: '',
  schedule: '',
  author: '',
  volume: '',
 });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
   const res = await fetch('/api/admin/resources', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
   });
   if (!res.ok) throw new Error();
   toast.success('Resource created');
   router.push('/admin/resources');
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
    <h1 className="text-2xl font-bold">Add Resource</h1>
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
       placeholder="e.g., By RPF Teaching Team"
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
     <FormInput label="Badge Color" type="color" value={formData.badge_color} onChange={(e) => setFormData({ ...formData, badge_color: e.target.value })} />
    </div>

    <div className="flex gap-4 justify-end pt-4">
     <RPFButton type="button" onClick={() => router.back()} className="bg-gray-100 text-gray-700 px-6 py-2 h-auto">Cancel</RPFButton>
     <RPFButton type="submit" disabled={isLoading} className="bg-primary text-white px-6 py-2 h-auto">{isLoading ? 'Saving...' : 'Create'}</RPFButton>
    </div>
   </form>
  </div>
 );
}
