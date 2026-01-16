"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Plus, Edit, Trash2, Search, GripVertical } from 'lucide-react';
import { ChhButton } from '@/components/common/ChhButton';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import {
 DndContext,
 closestCenter,
 KeyboardSensor,
 PointerSensor,
 useSensor,
 useSensors,
 DragEndEvent,
} from '@dnd-kit/core';
import {
 arrayMove,
 SortableContext,
 sortableKeyboardCoordinates,
 verticalListSortingStrategy,
 useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Resource {
 id: string;
 title: string;
 description: string;
 category: string;
 [key: string]: any;
}

function SortableRow({ resource, onDelete }: { resource: Resource; onDelete: (id: string) => void }) {
 const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
  isDragging,
 } = useSortable({ id: resource.id });

 const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  zIndex: isDragging ? 10 : 1,
  position: isDragging ? 'relative' as const : undefined,
  opacity: isDragging ? 0.8 : 1,
 };

 // We need to prevent the drag from cancelling click events on buttons
 // The GripVertical is the handle, so attributes/listeners should be there ONLY

 return (
  <tr
   ref={setNodeRef}
   style={style}
   className={`bg-white border-b hover:bg-gray-50 ${isDragging ? 'bg-gray-50 shadow-lg' : ''}`}
  >
   <td className="px-4 py-4 w-10">
    <button
     className="p-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 focus:outline-none"
     {...attributes}
     {...listeners}
    >
     <GripVertical className="size-5" />
    </button>
   </td>
   <td className="px-6 py-4 font-medium">{resource.title}</td>
   <td className="px-6 py-4 text-sm text-gray-700">{resource.description?.substring(0, 100)}...</td>
   <td className="px-6 py-4">
    {resource.category && (
     <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
      {resource.category}
     </span>
    )}
   </td>
   <td className="px-6 py-4 text-right">
    <div className="flex gap-2 justify-end">
     <Link href={`/admin/resources/edit/${resource.id}`}>
      <button className="p-2 hover:bg-gray-100 rounded-lg"><Edit className="size-4" /></button>
     </Link>
     <button onClick={() => onDelete(resource.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 className="size-4" /></button>
    </div>
   </td>
  </tr>
 );
}

export default function ResourcesListPage() {
 const router = useRouter();
 const [resources, setResources] = useState<Resource[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const [isDeleting, setIsDeleting] = useState(false);

 const sensors = useSensors(
  useSensor(PointerSensor),
  useSensor(KeyboardSensor, {
   coordinateGetter: sortableKeyboardCoordinates,
  })
 );

 useEffect(() => {
  fetchResources();
 }, []);

 async function fetchResources() {
  try {
   const res = await fetch('/api/admin/resources');
   if (!res.ok) throw new Error();
   setResources(await res.json());
  } catch (error) {
   toast.error('Failed to load resources');
  } finally {
   setIsLoading(false);
  }
 }

 async function handleDelete() {
  if (!deleteId) return;
  setIsDeleting(true);
  try {
   const res = await fetch(`/api/admin/resources/${deleteId}`, { method: 'DELETE' });
   if (!res.ok) throw new Error();
   toast.success('Resource deleted');
   setResources(resources.filter((r) => r.id !== deleteId));
   setDeleteId(null);
  } catch (error) {
   toast.error('Failed to delete');
  } finally {
   setIsDeleting(false);
  }
 }

 async function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;

  if (over && active.id !== over.id) {
   const oldIndex = resources.findIndex((item) => item.id === active.id);
   const newIndex = resources.findIndex((item) => item.id === over.id);

   const newItems = arrayMove(resources, oldIndex, newIndex);
   setResources(newItems);

   // Save the new order
   try {
    await fetch('/api/admin/resources/reorder', {
     method: 'POST',
     body: JSON.stringify({ items: newItems }),
    });
   } catch (err) {
    toast.error('Failed to save order');
    // Optionally revert state here if needed
   }
  }
 }

 const filtered = resources.filter((r) =>
  r.title?.toLowerCase().includes(searchQuery.toLowerCase())
 );

 return (
  <div>
   <div className="flex items-center justify-between mb-6">
    <div>
     <h1 className="text-2xl font-bold">Resources</h1>
     <p className="text-gray-600 mt-1">Manage Bright & Morning Star resources</p>
    </div>
    <Link href="/admin/resources/add">
     <ChhButton className="flex items-center gap-2 bg-primary text-white px-4 py-2 h-auto">
      <Plus className="size-4" />
      Add Resource
     </ChhButton>
    </Link>
   </div>

   <div className="mb-6">
    <div className="relative">
     <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
     <input
      type="text"
      placeholder="Search resources..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
     />
    </div>
   </div>

   <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
    <table className="w-full">
     <thead className="bg-gray-50 border-b">
      <tr>
       <th className="w-10 px-4 py-3"></th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
      </tr>
     </thead>
     <tbody className="divide-y">
      {isLoading ? (
       <tr><td colSpan={5} className="px-6 py-12 text-center"><div className="flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div></td></tr>
      ) : filtered.length === 0 ? (
       <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">No resources found</td></tr>
      ) : (
       <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
       >
        <SortableContext
         items={filtered.map(r => r.id)}
         strategy={verticalListSortingStrategy}
        >
         {filtered.map((res) => (
          <SortableRow key={res.id} resource={res} onDelete={setDeleteId} />
         ))}
        </SortableContext>
       </DndContext>
      )}
     </tbody>
    </table>
   </div>

   <ConfirmDialog
    isOpen={deleteId !== null}
    onClose={() => setDeleteId(null)}
    onConfirm={handleDelete}
    title="Delete Resource"
    message="Are you sure? This cannot be undone."
    variant="danger"
    isLoading={isDeleting}
   />
  </div>
 );
}
