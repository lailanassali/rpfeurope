"use client";

import { useState } from 'react';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { RPFButton } from '@/components/common/RPFButton';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { ImageUpload } from '@/components/admin/ImageUpload';

interface WhatToExpectItem {
 title: string;
 description: string;
 image: string;
}

interface WhatToExpectInputListProps {
 label: string;
 items: WhatToExpectItem[];
 onChange: (items: WhatToExpectItem[]) => void;
}

export function WhatToExpectInputList({ label, items, onChange }: WhatToExpectInputListProps) {
 const [newTitle, setNewTitle] = useState('');
 const [newDescription, setNewDescription] = useState('');
 const [newImage, setNewImage] = useState('');
 const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

 const handleAdd = () => {
  if (!newTitle.trim() || !newDescription.trim() || !newImage) return;
  onChange([...items, { title: newTitle.trim(), description: newDescription.trim(), image: newImage }]);
  setNewTitle('');
  setNewDescription('');
  setNewImage('');
 };

 const handleRemove = (index: number) => {
  const newItems = [...items];
  newItems.splice(index, 1);
  onChange(newItems);
 };

 const toggleExpand = (index: number) => {
  setExpandedIndex(expandedIndex === index ? null : index);
 };

 const handleUpdate = (index: number, field: keyof WhatToExpectItem, value: string) => {
  const newItems = [...items];
  newItems[index] = { ...newItems[index], [field]: value };
  onChange(newItems);
 };

 return (
  <div className="space-y-4">
   <label className="block text-sm font-medium text-gray-700">
    {label}
   </label>

   {/* List */}
   <div className="space-y-3">
    {items.map((item, index) => (
     <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center gap-3 p-3 bg-gray-100/50">
       <button
        type="button"
        onClick={() => toggleExpand(index)}
        className="text-gray-500 hover:text-gray-700"
       >
        {expandedIndex === index ? (
         <ChevronUp className="size-4" />
        ) : (
         <ChevronDown className="size-4" />
        )}
       </button>
       <div className="size-8 rounded overflow-hidden bg-gray-200 shrink-0">
        {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
       </div>
       <div className="flex-1 font-medium text-sm truncate">
        {item.title}
       </div>
       <button
        type="button"
        onClick={() => handleRemove(index)}
        className="text-gray-400 hover:text-red-500 transition-colors"
        title="Remove Item"
       >
        <X className="size-4" />
       </button>
      </div>

      {expandedIndex === index && (
       <div className="p-3 space-y-3 border-t border-gray-200 bg-white">
        <FormInput
         label="Title"
         value={item.title}
         onChange={(e) => handleUpdate(index, 'title', e.target.value)}
        />
        <FormTextarea
         label="Description"
         value={item.description}
         onChange={(e) => handleUpdate(index, 'description', e.target.value)}
         rows={3}
        />
        <ImageUpload
         label="Image"
         value={item.image}
         onChange={(url) => handleUpdate(index, 'image', url)}
        />
       </div>
      )}
     </div>
    ))}
   </div>

   {/* Add New Section */}
   <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
    <h4 className="text-sm font-medium text-gray-700">Add New Entry</h4>
    <div className="space-y-3">
     <FormInput
      label="Title"
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      placeholder="e.g. Worship & Prayer"
     />
     <FormTextarea
      label="Description"
      value={newDescription}
      onChange={(e) => setNewDescription(e.target.value)}
      rows={2}
      placeholder="e.g. Join us for a time of..."
     />
     <ImageUpload
      label="Image"
      value={newImage}
      onChange={(url) => setNewImage(url)}
     />
     <div className="flex justify-end">
      <RPFButton
       type="button"
       onClick={handleAdd}
       className="bg-primary text-white hover:bg-primary/90 px-4 h-9 text-sm"
       disabled={!newTitle.trim() || !newDescription.trim() || !newImage}
      >
       <Plus className="size-4 mr-2" />
       Add Entry
      </RPFButton>
     </div>
    </div>
   </div>
  </div>
 );
}
