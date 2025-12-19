"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface MultiImageUploadProps {
 value?: string[] | null;
 onChange: (urls: string[]) => void;
 label?: string;
 required?: boolean;
}

export function MultiImageUpload({ value, onChange, label, required }: MultiImageUploadProps) {
 const [isUploading, setIsUploading] = useState(false);
 const [images, setImages] = useState<string[]>(value || []);
 const fileInputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
  // Ensure we're working with an array
  const imageArray = Array.isArray(value) ? value : [];
  setImages(imageArray);
 }, [value]);

 const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  setIsUploading(true);
  const uploadedUrls: string[] = [];

  try {
   // Upload files sequentially or in parallel - keeping it simple with loop for now
   for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Validate file type
    if (!file.type.startsWith('image/')) {
     toast.error(`File ${file.name} is not an image`);
     continue;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
     toast.error(`File ${file.name} is too large (max 5MB)`);
     continue;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
     method: 'POST',
     body: formData,
    });

    if (!response.ok) {
     throw new Error(`Upload failed for ${file.name}`);
    }

    const data = await response.json();
    uploadedUrls.push(data.url);
   }

   if (uploadedUrls.length > 0) {
    const newImages = [...images, ...uploadedUrls];
    setImages(newImages);
    onChange(newImages); // Notify parent
    toast.success(`Successfully uploaded ${uploadedUrls.length} image(s)`);
   }
  } catch (error) {
   console.error('Upload error:', error);
   toast.error('Some images failed to upload');
  } finally {
   setIsUploading(false);
   if (fileInputRef.current) {
    fileInputRef.current.value = '';
   }
  }
 };

 const handleRemove = (indexToRemove: number) => {
  const newImages = images.filter((_, index) => index !== indexToRemove);
  setImages(newImages);
  onChange(newImages);
 };

 return (
  <div className="space-y-4">
   {label && (
    <label className="block text-sm font-medium text-gray-700">
     {label}
     {required && <span className="text-red-500 ml-1">*</span>}
    </label>
   )}

   {/* Grid of existing images */}
   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {images.map((url, index) => (
     <div key={`${url}-${index}`} className="relative group aspect-square">
      <img
       src={url}
       alt={`Uploaded ${index + 1}`}
       className="w-full h-full object-cover rounded-lg border border-gray-200"
      />
      <button
       type="button"
       onClick={() => handleRemove(index)}
       className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
      >
       <X className="size-4" />
      </button>
      <div className="absolute bottom-1 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full pointer-events-none">
       {index + 1}
      </div>
     </div>
    ))}

    {/* Upload Button */}
    <div
     onClick={() => fileInputRef.current?.click()}
     className={`
            aspect-square border-2 border-dashed border-gray-300 rounded-lg 
            flex flex-col items-center justify-center cursor-pointer 
            hover:border-primary hover:bg-gray-50 transition-all
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
    >
     {isUploading ? (
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
     ) : (
      <>
       <Plus className="size-8 text-gray-400 mb-2" />
       <span className="text-sm text-gray-500 font-medium">Add Images</span>
      </>
     )}
    </div>
   </div>

   <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    multiple
    onChange={handleFileChange}
    className="hidden"
    disabled={isUploading}
   />

   <p className="text-xs text-gray-500">
    Tip: You can select multiple files at once.
   </p>
  </div>
 );
}
