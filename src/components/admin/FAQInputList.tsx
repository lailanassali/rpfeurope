"use client";

import { useState } from 'react';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { ChhButton } from '@/components/common/ChhButton';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';

interface FAQItem {
 question: string;
 answer: string;
}

interface FAQInputListProps {
 label: string;
 items: FAQItem[];
 onChange: (items: FAQItem[]) => void;
}

export function FAQInputList({ label, items, onChange }: FAQInputListProps) {
 const [newQuestion, setNewQuestion] = useState('');
 const [newAnswer, setNewAnswer] = useState('');
 const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

 const handleAdd = () => {
  if (!newQuestion.trim() || !newAnswer.trim()) return;
  onChange([...items, { question: newQuestion.trim(), answer: newAnswer.trim() }]);
  setNewQuestion('');
  setNewAnswer('');
 };

 const handleRemove = (index: number) => {
  const newItems = [...items];
  newItems.splice(index, 1);
  onChange(newItems);
 };

 const toggleExpand = (index: number) => {
  setExpandedIndex(expandedIndex === index ? null : index);
 };

 const handleUpdate = (index: number, field: keyof FAQItem, value: string) => {
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
       <div className="flex-1 font-medium text-sm truncate">
        {item.question}
       </div>
       <button
        type="button"
        onClick={() => handleRemove(index)}
        className="text-gray-400 hover:text-red-500 transition-colors"
        title="Remove FAQ"
       >
        <X className="size-4" />
       </button>
      </div>

      {expandedIndex === index && (
       <div className="p-3 space-y-3 border-t border-gray-200 bg-white">
        <FormInput
         label="Question"
         value={item.question}
         onChange={(e) => handleUpdate(index, 'question', e.target.value)}
        />
        <FormTextarea
         label="Answer"
         value={item.answer}
         onChange={(e) => handleUpdate(index, 'answer', e.target.value)}
         rows={3}
        />
       </div>
      )}
     </div>
    ))}
   </div>

   {/* Add New Section */}
   <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
    <h4 className="text-sm font-medium text-gray-700">Add New FAQ</h4>
    <div className="space-y-3">
     <FormInput
      label="Question"
      value={newQuestion}
      onChange={(e) => setNewQuestion(e.target.value)}
      placeholder="e.g. Is lunch provided?"
     />
     <FormTextarea
      label="Answer"
      value={newAnswer}
      onChange={(e) => setNewAnswer(e.target.value)}
      rows={2}
      placeholder="e.g. Yes, we provide..."
     />
     <div className="flex justify-end">
      <ChhButton
       type="button"
       onClick={handleAdd}
       className="bg-primary text-white hover:bg-primary/90 px-4 h-9 text-sm"
       disabled={!newQuestion.trim() || !newAnswer.trim()}
      >
       <Plus className="size-4 mr-2" />
       Add FAQ
      </ChhButton>
     </div>
    </div>
   </div>
  </div>
 );
}
