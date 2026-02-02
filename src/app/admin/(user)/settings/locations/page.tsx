"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { GripVertical, Save } from 'lucide-react';
import { RPFButton } from '@/components/common/RPFButton';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

export default function LocationSettingsPage() {
 const [order, setOrder] = useState<string[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [isSaving, setIsSaving] = useState(false);

 // Default tags if none are saved
 const defaultTags = ['RPF UK', 'RPF Europe', 'RPF Africa', 'RPF on Campus'];

 useEffect(() => {
  fetchOrder();
 }, []);

 async function fetchOrder() {
  try {
   const res = await fetch('/api/admin/settings/location-order');
   if (res.ok) {
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
     setOrder(data);
    } else {
     setOrder(defaultTags);
    }
   }
  } catch (error) {
   toast.error('Failed to load settings');
   setOrder(defaultTags);
  } finally {
   setIsLoading(false);
  }
 }

 async function handleSave() {
  setIsSaving(true);
  try {
   const res = await fetch('/api/admin/settings/location-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
   });

   if (!res.ok) throw new Error();
   toast.success('Order saved successfully');
  } catch (error) {
   toast.error('Failed to save order');
  } finally {
   setIsSaving(false);
  }
 }

 const onDragEnd = (result: DropResult) => {
  if (!result.destination) return;

  const items = Array.from(order);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  setOrder(items);
 };

 if (isLoading) return <div className="p-8">Loading...</div>;

 return (
  <div className="max-w-2xl mx-auto py-8">
   <div className="flex items-center justify-between mb-8">
    <div>
     <h1 className="text-2xl font-bold">Location Settings</h1>
     <p className="text-gray-600 mt-1">Manage the display order of location tabs</p>
    </div>
    <RPFButton
     onClick={handleSave}
     disabled={isSaving}
     className="bg-primary text-white flex items-center gap-2"
    >
     <Save className="size-4" />
     {isSaving ? 'Saving...' : 'Save Order'}
    </RPFButton>
   </div>

   <div className="bg-white rounded-lg shadow-sm border p-6">
    <h3 className="font-semibold mb-4">Reorder Tabs</h3>
    <p className="text-sm text-gray-500 mb-6">Drag and drop items to reorder them. New tags found in the database will be automatically added to the bottom of this list and on the public website until reordered here.</p>

    <DragDropContext onDragEnd={onDragEnd}>
     <Droppable droppableId="tags">
      {(provided) => (
       <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
        {order.map((tag, index) => (
         <Draggable key={tag} draggableId={tag} index={index}>
          {(provided) => (
           <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex items-center gap-3 p-3 bg-gray-50 border rounded-lg hover:border-primary/50 transition-colors cursor-move"
           >
            <GripVertical className="size-5 text-gray-400" />
            <span className="font-medium">{tag}</span>
           </li>
          )}
         </Draggable>
        ))}
        {provided.placeholder}
       </ul>
      )}
     </Droppable>
    </DragDropContext>
   </div>
  </div>
 );
}
