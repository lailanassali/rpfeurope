"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { ChhButton } from '@/components/common/ChhButton';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

export default function ResourcesListPage() {
 const router = useRouter();
 const [resources, setResources] = useState<any[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const [isDeleting, setIsDeleting] = useState(false);

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
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
      </tr>
     </thead>
     <tbody className="divide-y">
      {isLoading ? (
       <tr><td colSpan={4} className="px-6 py-12 text-center"><div className="flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div></td></tr>
      ) : filtered.length === 0 ? (
       <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">No resources found</td></tr>
      ) : (
       filtered.map((res) => (
        <tr key={res.id} className="hover:bg-gray-50">
         <td className="px-6 py-4 font-medium">{res.title}</td>
         <td className="px-6 py-4 text-sm text-gray-700">{res.description?.substring(0, 100)}...</td>
         <td className="px-6 py-4">
          {res.category && (
           <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {res.category}
           </span>
          )}
         </td>
         <td className="px-6 py-4 text-right">
          <div className="flex gap-2 justify-end">
           <Link href={`/admin/resources/edit/${res.id}`}>
            <button className="p-2 hover:bg-gray-100 rounded-lg"><Edit className="size-4" /></button>
           </Link>
           <button onClick={() => setDeleteId(res.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 className="size-4" /></button>
          </div>
         </td>
        </tr>
       ))
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
