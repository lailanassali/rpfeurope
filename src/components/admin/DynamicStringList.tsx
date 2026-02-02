"use client";

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { RPFButton } from '@/components/common/RPFButton';
import { FormInput } from '@/components/common/FormInput';

interface DynamicStringListProps {
 label: string;
 items: string[];
 onChange: (items: string[]) => void;
 placeholder?: string;
 addButtonText?: string;
}

export function DynamicStringList({
 label,
 items,
 onChange,
 placeholder = "Add item...",
 addButtonText = "Add Item"
}: DynamicStringListProps) {
 const [newItem, setNewItem] = useState('');

 const handleAdd = () => {
  if (!newItem.trim()) return;
  onChange([...items, newItem.trim()]);
  setNewItem('');
 };

 const handleRemove = (index: number) => {
  const newItems = [...items];
  newItems.splice(index, 1);
  onChange(newItems);
 };

 const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
   e.preventDefault();
   handleAdd();
  }
 };

 return (
  <div className="space-y-3">
   <label className="block text-sm font-medium text-gray-700">
    {label}
   </label>

   {/* List */}
   <div className="space-y-2">
    {items.map((item, index) => (
     <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded-md border border-gray-200">
      <span className="flex-1 text-sm text-gray-800">{item}</span>
      <button
       type="button"
       onClick={() => handleRemove(index)}
       className="text-gray-400 hover:text-red-500 transition-colors"
      >
       <X className="size-4" />
      </button>
     </div>
    ))}
   </div>

   {/* Add New */}
   <div className="flex gap-2 items-center">
    <div className="flex-1">
     <FormInput
      label=""
      value={newItem}
      onChange={(e) => setNewItem(e.target.value)}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
     />
    </div>
    <RPFButton
     type="button"
     onClick={handleAdd}
     className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 h-[42px] mt-0"
     disabled={!newItem.trim()}
    >
     <Plus className="size-4 mr-2" />
     {addButtonText}
    </RPFButton>
   </div>
  </div>
 );
}
