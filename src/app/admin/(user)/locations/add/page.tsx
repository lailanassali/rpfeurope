"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { FormSelect } from '@/components/common/FormSelect';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { MultiImageUpload } from '@/components/admin/MultiImageUpload';
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
  whatsapp_link: '',
  contact: '',
  carousel_images: [] as string[],
  welcome_heading: '',
  welcome_description: '',
  welcome_quote: '',
  address_image_url: '',
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     <FormInput label="Location Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
     <FormSelect
      label="Location Tag"
      options={TAG_OPTIONS}
      value={formData.tag}
      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
      placeholder="Select a location category"
      required
     />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     <ImageUpload label="Hero Image" value={formData.image_url} onChange={(url) => setFormData({ ...formData, image_url: url })} />
     <ImageUpload label="Address Section Image" value={formData.address_image_url} onChange={(url) => setFormData({ ...formData, address_image_url: url })} />
    </div>

    <div className="border-t pt-4 mt-4">
     <h3 className="font-semibold text-lg mb-4">Welcome Section</h3>
     <div className="space-y-4">
      <FormInput
       label="Welcome Heading"
       value={formData.welcome_heading}
       onChange={(e) => setFormData({ ...formData, welcome_heading: e.target.value })}
       placeholder="e.g. We Look Forward to Welcoming You"
      />
      <FormTextarea
       label="Welcome Description"
       value={formData.welcome_description}
       onChange={(e) => setFormData({ ...formData, welcome_description: e.target.value })}
       rows={3}
      />
      <FormTextarea
       label="Welcome Quote"
       value={formData.welcome_quote}
       onChange={(e) => setFormData({ ...formData, welcome_quote: e.target.value })}
       rows={2}
       placeholder="e.g. Whether you are new to faith..."
      />
     </div>
    </div>

    <div className="border-t pt-4 mt-4">
     <h3 className="font-semibold text-lg mb-4">Gallery</h3>
     <MultiImageUpload
      label="Carousel Images"
      value={formData.carousel_images}
      onChange={(urls) => setFormData({ ...formData, carousel_images: urls })}
     />
    </div>

    <div className="border-t pt-4 mt-4">
     <h3 className="font-semibold text-lg mb-4">Details</h3>
     <FormTextarea label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
     <FormTextarea
      label="Services"
      value={formData.services}
      onChange={(e) => setFormData({ ...formData, services: e.target.value })}
      placeholder="e.g., Sunday Service - 10:00 AM | Bible Study - 6:00 PM | Prayer Meeting - 7:00 PM"
      rows={3}
     />
     <div className="text-sm text-gray-600 -mt-2 mb-4">
      Enter services separated by pipe (|). Each service can include the type and time.
     </div>

     {formData.tag === 'CHH on Campus' ? (
      <FormInput
       label="WhatsApp Link"
       value={formData.whatsapp_link}
       onChange={(e) => setFormData({ ...formData, whatsapp_link: e.target.value })}
       placeholder="https://chat.whatsapp.com/..."
      />
     ) : (
      <div>
       <FormTextarea
        label="Contact Info"
        value={formData.contact}
        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
        placeholder="e.g. +44 123 456 7890 | email@example.com"
        rows={2}
       />
       <div className="text-sm text-gray-600 mt-1">
        Enter contacts separated by pipe (|).
       </div>
      </div>
     )}

     <FormInput label="Map Link (Optional)" value={formData.map_link} onChange={(e) => setFormData({ ...formData, map_link: e.target.value })} />
    </div>

    <div className="flex gap-4 justify-end pt-4">
     <ChhButton type="button" onClick={() => router.back()} className="bg-gray-100 text-gray-700 px-6 py-2 h-auto">Cancel</ChhButton>
     <ChhButton type="submit" disabled={isLoading} className="bg-primary text-white px-6 py-2 h-auto">{isLoading ? 'Saving...' : 'Create'}</ChhButton>
    </div>
   </form>
  </div>
 );
}
