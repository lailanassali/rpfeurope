"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { FormSelect } from '@/components/common/FormSelect';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ChhButton } from '@/components/common/ChhButton';

const TAG_OPTIONS = [
 { value: 'CHH UK', label: 'CHH UK' },
 { value: 'CHH Europe', label: 'CHH Europe' },
 { value: 'CHH Africa', label: 'CHH Africa' },
 { value: 'CHH on Campus', label: 'CHH on Campus' },
];

export default function AddLocationPage() {
 const router = useRouter();
 const [isLoading, setIsLoading] = useState(false);
 const [formData, setFormData] = useState({
  name: '',
  tag: '',
  image_url: '',
  address: '',
  services: '',
  map_link: '',
 });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
   const res = await fetch('/api/admin/locations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
   });
   if (!res.ok) throw new Error();
   toast.success('Location created');
   router.push('/admin/locations');
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
    <h1 className="text-2xl font-bold">Add Location</h1>
   </div>

   <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
    <FormInput label="Location Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
    <FormSelect 
     label="Location Tag" 
     options={TAG_OPTIONS} 
     value={formData.tag} 
     onChange={(e) => setFormData({ ...formData, tag: e.target.value })} 
     placeholder="Select a location category"
     required 
    />
    <ImageUpload label="Location Image" value={formData.image_url} onChange={(url) => setFormData({ ...formData, image_url: url })} />
    <FormTextarea label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
    <FormTextarea 
     label="Services" 
     value={formData.services} 
     onChange={(e) => setFormData({ ...formData, services: e.target.value })} 
     placeholder="e.g., Sunday Service - 10:00 AM | Bible Study - 6:00 PM | Prayer Meeting - 7:00 PM"
     rows={3}
    />
    <div className="text-sm text-gray-600 -mt-2">
     Enter services separated by pipe (|). Each service can include the type and time.
    </div>
    <FormInput label="Map Link (Optional)" value={formData.map_link} onChange={(e) => setFormData({ ...formData, map_link: e.target.value })} />

    <div className="flex gap-4 justify-end pt-4">
     <ChhButton type="button" onClick={() => router.back()} className="bg-gray-100 text-gray-700 px-6 py-2 h-auto">Cancel</ChhButton>
     <ChhButton type="submit" disabled={isLoading} className="bg-primary text-white px-6 py-2 h-auto">{isLoading ? 'Saving...' : 'Create'}</ChhButton>
    </div>
   </form>
  </div>
 );
}
