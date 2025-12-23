"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Plus, Edit, Trash2, Filter } from 'lucide-react';
import { ChhButton } from '@/components/common/ChhButton';
import { FormSelect } from '@/components/common/FormSelect';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

export default function FAQsListPage() {
 const router = useRouter();
 const [faqs, setFaqs] = useState<any[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [categoryFilter, setCategoryFilter] = useState('');
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const [isDeleting, setIsDeleting] = useState(false);

 useEffect(() => {
  fetchFAQs();
 }, [categoryFilter]);

 async function fetchFAQs() {
  try {
   const url = categoryFilter ? `/api/admin/faqs?category=${categoryFilter}` : '/api/admin/faqs';
   const res = await fetch(url);
   if (!res.ok) throw new Error();
   setFaqs(await res.json());
  } catch (error) {
   toast.error('Failed to load FAQs');
  } finally {
   setIsLoading(false);
  }
 }

 async function handleDelete() {
  if (!deleteId) return;
  setIsDeleting(true);
  try {
   const res = await fetch(`/api/admin/faqs/${deleteId}`, { method: 'DELETE' });
   if (!res.ok) throw new Error();
   toast.success('FAQ deleted');
   setFaqs(faqs.filter((f) => f.id !== deleteId));
   setDeleteId(null);
  } catch (error) {
   toast.error('Failed to delete');
  } finally {
   setIsDeleting(false);
  }
 }

 return (
  <div>
   <div className="flex items-center justify-between mb-6">
    <div>
     <h1 className="text-2xl font-bold">FAQs</h1>
     <p className="text-gray-600 mt-1">Manage frequently asked questions</p>
    </div>
    <Link href="/admin/faqs/add">
     <ChhButton className="flex items-center gap-2 bg-primary text-white px-4 py-2 h-auto">
      <Plus className="size-4" />
      Add FAQ
     </ChhButton>
    </Link>
   </div>

   <div className="mb-6">
    <div className="flex items-center gap-2">
     <Filter className="size-5 text-gray-400" />
     <FormSelect
      label="Filter by Category"
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      options={[
       { value: '', label: 'All Categories' },
       { value: 'Baptism', label: 'Baptism' },
       { value: 'Counselling', label: 'Counselling' },
       { value: 'Prayers', label: 'Prayers' },
       { value: 'Serve', label: 'Serve' },
       { value: 'Mentorship', label: 'Mentorship' },
       { value: 'General', label: 'General' },
      ]}
     />
    </div>
   </div>

   <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
    <table className="w-full">
     <thead className="bg-gray-50 border-b">
      <tr>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
      </tr>
     </thead>
     <tbody className="divide-y">
      {isLoading ? (
       <tr><td colSpan={4} className="px-6 py-12 text-center"><div className="flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div></td></tr>
      ) : faqs.length === 0 ? (
       <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">No FAQs found</td></tr>
      ) : (
       faqs.map((faq) => (
        <tr key={faq.id} className="hover:bg-gray-50">
         <td className="px-6 py-4 font-medium">{faq.question}</td>
         <td className="px-6 py-4">
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
           {faq.category}
          </span>
         </td>
         <td className="px-6 py-4 text-sm text-gray-700">{faq.order_index}</td>
         <td className="px-6 py-4 text-right">
          <div className="flex gap-2 justify-end">
           <Link href={`/admin/faqs/edit/${faq.id}`}>
            <button className="p-2 hover:bg-gray-100 rounded-lg"><Edit className="size-4" /></button>
           </Link>
           <button onClick={() => setDeleteId(faq.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 className="size-4" /></button>
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
    title="Delete FAQ"
    message="Are you sure? This cannot be undone."
    variant="danger"
    isLoading={isDeleting}
   />
  </div>
 );
}
