"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

export default function EditLocationPage() {
 const router = useRouter();
 const params = useParams();
 const id = params?.id as string;
 const [isLoading, setIsLoading] = useState(false);
 const [isFetching, setIsFetching] = useState(true);
 const [formData, setFormData] = useState({
  name: '',
  tag: '',
  image_url: '',
  address: '',
  services: '',
  map_link: '',
 });

 useEffect(() => {
  if (id) {
   fetchLocation();
  }
 }, [id]);

 async function fetchLocation() {
  try {
   const res = await fetch(`/api/admin/locations/${id}`);
   if (!res.ok) throw new Error();
   const data = await res.json();
   setFormData({
    name: data.name || '',
    tag: data.tag || '',
    image_url: data.image_url || '',
    address: data.address || '',
    services: data.services || '',
    map_link: data.map_link || '',
   });
  } catch (error) {
   toast.error('Failed to load location');
   router.push('/admin/locations');
  } finally {
   setIsFetching(false);
  }
 }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
   const res = await fetch(`/api/admin/locations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
   });
   if (!res.ok) throw new Error();
   toast.success('Location updated');
   router.push('/admin/locations');
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
    <h1 className="text-2xl font-bold">Edit Location</h1>
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
     <ChhButton type="submit" disabled={isLoading} className="bg-primary text-white px-6 py-2 h-auto">{isLoading ? 'Updating...' : 'Update'}</ChhButton>
    </div>
   </form>
  </div>
 );
}
