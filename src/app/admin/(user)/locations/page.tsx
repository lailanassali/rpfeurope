"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { ChhButton } from '@/components/common/ChhButton';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

export default function LocationsListPage() {
 const router = useRouter();
 const [locations, setLocations] = useState<any[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const [isDeleting, setIsDeleting] = useState(false);

 useEffect(() => {
  fetchLocations();
 }, []);

 async function fetchLocations() {
  try {
   const res = await fetch('/api/admin/locations');
   if (!res.ok) throw new Error();
   setLocations(await res.json());
  } catch (error) {
   toast.error('Failed to load locations');
  } finally {
   setIsLoading(false);
  }
 }

 async function handleDelete() {
  if (!deleteId) return;
  setIsDeleting(true);
  try {
   const res = await fetch(`/api/admin/locations/${deleteId}`, { method: 'DELETE' });
   if (!res.ok) throw new Error();
   toast.success('Location deleted');
   setLocations(locations.filter((l) => l.id !== deleteId));
   setDeleteId(null);
  } catch (error) {
   toast.error('Failed to delete');
  } finally {
   setIsDeleting(false);
  }
 }

 const filtered = locations.filter((l) =>
  l.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  l.tag?.toLowerCase().includes(searchQuery.toLowerCase())
 );

 return (
  <div>
   <div className="flex items-center justify-between mb-6">
    <div>
     <h1 className="text-2xl font-bold">Locations</h1>
     <p className="text-gray-600 mt-1">Manage CHH locations</p>
    </div>
    <Link href="/admin/locations/add">
     <ChhButton className="flex items-center gap-2 bg-primary text-white px-4 py-2 h-auto">
      <Plus className="size-4" />
      Add Location
     </ChhButton>
    </Link>
   </div>

   <div className="mb-6">
    <div className="relative">
     <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
     <input
      type="text"
      placeholder="Search locations..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
     />
    </div>
   </div>

   <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
    <table className="w-full">
     <thead className="bg-gray-50 border-b">
      <tr>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tag</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Services</th>
       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
      </tr>
     </thead>
     <tbody className="divide-y">
      {isLoading ? (
       <tr><td colSpan={5} className="px-6 py-12 text-center"><div className="flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div></td></tr>
      ) : filtered.length === 0 ? (
       <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">No locations found</td></tr>
      ) : (
       filtered.map((loc) => (
        <tr key={loc.id} className="hover:bg-gray-50">
         <td className="px-6 py-4 font-medium">{loc.name}</td>
         <td className="px-6 py-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
           {loc.tag || 'N/A'}
          </span>
         </td>
         <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{loc.address}</td>
         <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{loc.services || 'N/A'}</td>
         <td className="px-6 py-4 text-right">
          <div className="flex gap-2 justify-end">
           <Link href={`/admin/locations/edit/${loc.id}`}>
            <button className="p-2 hover:bg-gray-100 rounded-lg"><Edit className="size-4" /></button>
           </Link>
           <button onClick={() => setDeleteId(loc.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 className="size-4" /></button>
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
    title="Delete Location"
    message="Are you sure? This cannot be undone."
    variant="danger"
    isLoading={isDeleting}
   />
  </div>
 );
}
