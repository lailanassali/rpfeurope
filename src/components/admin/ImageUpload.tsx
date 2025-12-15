"use client";

import { useState, useRef } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ImageUploadProps {
 value?: string;
 onChange: (url: string) => void;
 label?: string;
 required?: boolean;
}

export function ImageUpload({ value, onChange, label, required }: ImageUploadProps) {
 const [isUploading, setIsUploading] = useState(false);
 const [preview, setPreview] = useState<string | undefined>(value);
 const fileInputRef = useRef<HTMLInputElement>(null);

 const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith('image/')) {
   toast.error('Please select an image file');
   return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
   toast.error('Image size must be less than 5MB');
   return;
  }

  setIsUploading(true);

  try {
   // Create FormData
   const formData = new FormData();
   formData.append('file', file);

   // Upload to API
   const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
   });

   if (!response.ok) {
    throw new Error('Upload failed');
   }

   const data = await response.json();
   const imageUrl = data.url;

   setPreview(imageUrl);
   onChange(imageUrl);
   toast.success('Image uploaded successfully');
  } catch (error) {
   console.error('Upload error:', error);
   toast.error('Failed to upload image');
  } finally {
   setIsUploading(false);
  }
 };

 const handleRemove = () => {
  setPreview(undefined);
  onChange('');
  if (fileInputRef.current) {
   fileInputRef.current.value = '';
  }
 };

 return (
  <div className="space-y-2">
   {label && (
    <label className="block text-sm font-medium text-gray-700">
     {label}
     {required && <span className="text-red-500 ml-1">*</span>}
    </label>
   )}

   {preview ? (
    <div className="relative group">
     <img
      src={preview}
      alt="Preview"
      className="w-full h-48 object-cover rounded-lg border border-gray-200"
     />
     <button
      type="button"
      onClick={handleRemove}
      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
     >
      <X className="size-4" />
     </button>
    </div>
   ) : (
    <div
     onClick={() => fileInputRef.current?.click()}
     className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
    >
     <div className="flex flex-col items-center gap-2">
      {isUploading ? (
       <>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-sm text-gray-600">Uploading...</p>
       </>
      ) : (
       <>
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
         <ImageIcon className="size-6 text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-700">
         Click to upload image
        </p>
        <p className="text-xs text-gray-500">
         PNG, JPG, GIF up to 1MB
        </p>
       </>
      )}
     </div>
    </div>
   )}

   <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="hidden"
    disabled={isUploading}
   />
  </div>
 );
}
