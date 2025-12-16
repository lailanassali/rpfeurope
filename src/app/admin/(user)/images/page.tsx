"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Trash2, Image as ImageIcon } from 'lucide-react';
import { FormSelect } from '@/components/common/FormSelect';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ChhButton } from '@/components/common/ChhButton';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

const PAGE_OPTIONS = [
 // Home Page
 { value: 'home_hero', label: 'Home - Hero Section', isCarousel: false },
 { value: 'home_bottom_hero', label: 'Home - Final CTA', isCarousel: false },
 { value: 'ministries_carousel', label: 'Home - Ministries Carousel', isCarousel: true },
 { value: 'connect_carousel', label: 'Home - Connect Carousel', isCarousel: true },

 // Youth Ministry
 { value: 'youth_hero', label: 'Youth - Hero Section', isCarousel: false },
 { value: 'youth_sections', label: 'Youth - Section Images', isCarousel: true },
 { value: 'youth_cta', label: 'Youth - Final CTA', isCarousel: false },

 // Fellowship Ministry
 { value: 'fellowship_hero', label: 'Fellowship - Hero Section', isCarousel: false },
 { value: 'fellowship_activities', label: 'Fellowship - Activities Carousel', isCarousel: true },
 { value: 'fellowship_cta', label: 'Fellowship - Final CTA', isCarousel: false },

 // Children's Ministry
 { value: 'children_hero', label: 'Children - Hero Section', isCarousel: false },
 { value: 'children_activities', label: 'Children - Activities', isCarousel: true },
 { value: 'children_cta', label: 'Children - Final CTA', isCarousel: false },

 // University Ministry
 { value: 'university_hero', label: 'University - Hero Section', isCarousel: false },
 { value: 'university_activities', label: 'University - Activities', isCarousel: true },
 { value: 'university_cta', label: 'University - Final CTA', isCarousel: false },

 // About Page
 { value: 'about_hero', label: 'About - Hero Section', isCarousel: false },
 { value: 'about_cta', label: 'About - Final CTA', isCarousel: false },

 // Resources Page
 { value: 'resources_cta', label: 'Resources - Final CTA', isCarousel: false },

 // Connect Page Tabs
 { value: 'connect_baptism', label: 'Connect - Baptism Tab', isCarousel: false },
 { value: 'connect_counselling', label: 'Connect - Counselling Tab', isCarousel: false },
 { value: 'connect_mentorship', label: 'Connect - Mentorship Tab', isCarousel: false },
 { value: 'connect_serve', label: 'Connect - Serve Tab', isCarousel: false },
 { value: 'connect_testimonies', label: 'Connect - Testimonies Tab', isCarousel: false },
 { value: 'connect_prayer', label: 'Connect - Prayer Tab', isCarousel: false },
];

export default function ImagesPage() {
 const [selectedPage, setSelectedPage] = useState('home_hero');
 const [images, setImages] = useState<any[]>([]);
 const [newImageUrl, setNewImageUrl] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const [isDeleting, setIsDeleting] = useState(false);

 const currentPageOption = PAGE_OPTIONS.find(p => p.value === selectedPage);
 const isCarousel = currentPageOption?.isCarousel || false;

 useEffect(() => {
  fetchImages();
  setNewImageUrl('');
 }, [selectedPage]);

 async function fetchImages() {
  try {
   const res = await fetch(`/api/admin/images?page=${selectedPage}`);
   if (res.ok) {
    setImages(await res.json());
   }
  } catch (error) {
   toast.error('Failed to load images');
  }
 }

 async function handleUpload(urlOverride?: string) {
  const urlToUse = typeof urlOverride === 'string' ? urlOverride : newImageUrl;

  if (!urlToUse) {
   toast.error('Please upload an image');
   return;
  }

  setIsLoading(true);
  try {
   const res = await fetch('/api/admin/images', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
     page_identifier: selectedPage,
     image_url: urlToUse,
     is_carousel: isCarousel,
     order: images.length,
    }),
   });

   if (!res.ok) throw new Error();
   toast.success(isCarousel ? 'Image added to carousel' : 'Page image updated');
   setNewImageUrl('');
   fetchImages();
  } catch (error) {
   toast.error('Failed to upload image');
  } finally {
   setIsLoading(false);
  }
 }

 async function handleDelete() {
  if (!deleteId) return;
  setIsDeleting(true);
  try {
   const res = await fetch(`/api/admin/images/${deleteId}`, { method: 'DELETE' });
   if (!res.ok) throw new Error();
   toast.success('Image deleted');
   setImages(images.filter(img => img.id !== deleteId));
   setDeleteId(null);
  } catch (error) {
   toast.error('Failed to delete');
  } finally {
   setIsDeleting(false);
  }
 }

 return (
  <div>
   <div className="mb-6">
    <h1 className="text-2xl font-bold">Image Management</h1>
    <p className="text-gray-600 mt-1">Manage images across your website</p>
   </div>

   {/* Page Selector */}
   <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
    <h3 className="font-semibold mb-4 capitalize">Select A Page You want to add image to</h3>
    <FormSelect
     label=""
     value={selectedPage}
     onChange={(e) => setSelectedPage(e.target.value)}
     options={PAGE_OPTIONS.map(p => ({ value: p.value, label: p.label }))}
    />
    <p className="text-sm text-gray-600 mt-2">
     {isCarousel ? '📸 Carousel - You can add multiple images' : '🖼 Single Image - Uploading will replace existing image'}
    </p>
   </div>

   {/* Upload Section */}
   <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
    <h3 className="font-semibold mb-4">Upload New Image</h3>
    <ImageUpload
     value={newImageUrl}
     onChange={(url) => {
      setNewImageUrl(url);
      if (url) {
       handleUpload(url);
      }
     }}
     label={isCarousel ? 'Add Image to Carousel' : 'Replace Page Image'}
    />
    <div className="mt-4">
     <ChhButton
      onClick={() => handleUpload()}
      disabled={isLoading || !newImageUrl}
      className="bg-primary text-white px-6 py-2 h-auto"
     >
      {isLoading ? 'Uploading...' : isCarousel ? 'Add to Carousel' : 'Update Image'}
     </ChhButton>
    </div>
   </div>

   {/* Current Images */}
   <div className="bg-white rounded-lg shadow-sm border p-6">
    <h3 className="font-semibold mb-4">Current {isCarousel ? 'Carousel Images' : 'Image'}</h3>
    {images.length === 0 ? (
     <div className="text-center py-12 text-gray-500">
      <ImageIcon className="size-12 mx-auto mb-2 text-gray-300" />
      <p>No images uploaded yet</p>
     </div>
    ) : isCarousel ? (
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((img, idx) => (
       <div key={img.id} className="relative group">
        <img
         src={img.image_url}
         alt={`Image ${idx + 1}`}
         className="w-full h-48 object-cover rounded-lg border"
        />
        <button
         onClick={() => setDeleteId(img.id)}
         className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
         <Trash2 className="size-4" />
        </button>
        <div className="mt-2 text-sm text-gray-600">Order: {img.order}</div>
       </div>
      ))}
     </div>
    ) : (
     <div>
      {images.map((img, idx) => (
       <img
        key={img.id}
        src={img.image_url}
        alt={`Page Image`}
        className="w-full h-[300px] object-cover rounded-lg border"
       />
      ))}
     </div>
    )}
   </div>

   <ConfirmDialog
    isOpen={deleteId !== null}
    onClose={() => setDeleteId(null)}
    onConfirm={handleDelete}
    title="Delete Image"
    message="Are you sure? This cannot be undone."
    variant="danger"
    isLoading={isDeleting}
   />
  </div>
 );
}
