"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Trash2, Edit, CheckCircle2, XCircle, Plus } from 'lucide-react';
import { ChhButton } from '@/components/common/ChhButton';

interface Testimonial {
 id: string;
 name: string;
 testimony: string;
 is_approved: boolean;
 created_at: string;
}

export default function TestimonialsPage() {
 const router = useRouter();
 const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

 useEffect(() => {
  fetchTestimonials();
 }, [filter]);

 async function fetchTestimonials() {
  try {
   const params = filter !== 'all' ? `?status=${filter}` : '';
   const res = await fetch(`/api/admin/testimonials${params}`);
   if (!res.ok) throw new Error();
   const data = await res.json();
   setTestimonials(data);
  } catch (error) {
   toast.error('Failed to load testimonials');
  } finally {
   setIsLoading(false);
  }
 }

 async function handleQuickApproval(id: string, is_approved: boolean) {
  try {
   const res = await fetch(`/api/admin/testimonials/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ is_approved }),
   });
   if (!res.ok) throw new Error();
   toast.success(is_approved ? 'Testimonial approved!' : 'Testimonial unapproved');
   fetchTestimonials();
  } catch (error) {
   toast.error('Failed to update status');
  }
 }

 async function handleDelete(id: string) {
  if (!confirm('Are you sure you want to delete this testimonial?')) return;
  try {
   const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
   if (!res.ok) throw new Error();
   toast.success('Testimonial deleted');
   fetchTestimonials();
  } catch (error) {
   toast.error('Failed to delete');
  }
 }

 const pendingCount = testimonials.filter(t => !t.is_approved).length;
 const approvedCount = testimonials.filter(t => t.is_approved).length;

 return (
  <div>
   <div className="flex justify-between items-center mb-6">
    <div>
     <h1 className="text-2xl font-bold">Testimonials</h1>
     <p className="text-gray-600 mt-1">
      {pendingCount} pending • {approvedCount} approved • {testimonials.length} total
     </p>
    </div>
    <ChhButton onClick={() => router.push('/admin/testimonials/add')} className="bg-primary text-white h-auto px-4 py-2">
     <Plus className="size-5 mr-2" />
     Add Testimonial
    </ChhButton>
   </div>

   {/* Filter Tabs */}
   <div className="flex gap-2 mb-6">
    {['all', 'pending', 'approved'].map((status) => (
     <button
      key={status}
      onClick={() => setFilter(status as any)}
      className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${filter === status
        ? 'bg-primary text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
       }`}
     >
      {status}
     </button>
    ))}
   </div>

   {isLoading ? (
    <div className="flex justify-center py-12">
     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
   ) : testimonials.length === 0 ? (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
     <p className="text-gray-500">No testimonials found</p>
    </div>
   ) : (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
     <table className="w-full">
      <thead className="bg-gray-50 border-b">
       <tr>
        <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Name</th>
        <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Testimony</th>
        <th className="text-center px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
        <th className="text-center px-6 py-3 text-sm font-semibold text-gray-700">Quick Actions</th>
        <th className="text-center px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
       </tr>
      </thead>
      <tbody>
       {testimonials.map((testimonial) => (
        <tr key={testimonial.id} className="border-b hover:bg-gray-50">
         <td className="px-6 py-4 text-sm font-medium">{testimonial.name}</td>
         <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
          <div className="line-clamp-2">{testimonial.testimony}</div>
         </td>
         <td className="px-6 py-4 text-center">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${testimonial.is_approved
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
           }`}>
           {testimonial.is_approved ? 'Approved' : 'Pending'}
          </span>
         </td>
         <td className="px-6 py-4">
          <div className="flex items-center justify-center gap-2">
           {!testimonial.is_approved ? (
            <button
             onClick={() => handleQuickApproval(testimonial.id, true)}
             className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
             title="Approve"
            >
             <CheckCircle2 className="size-5 text-green-600 group-hover:text-green-700" />
            </button>
           ) : (
            <button
             onClick={() => handleQuickApproval(testimonial.id, false)}
             className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
             title="Unapprove"
            >
             <XCircle className="size-5 text-red-600 group-hover:text-red-700" />
            </button>
           )}
          </div>
         </td>
         <td className="px-6 py-4">
          <div className="flex items-center justify-center gap-2">
           <button
            onClick={() => router.push(`/admin/testimonials/edit/${testimonial.id}`)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
           >
            <Edit className="size-5 text-blue-600" />
           </button>
           <button
            onClick={() => handleDelete(testimonial.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
           >
            <Trash2 className="size-5 text-red-600" />
           </button>
          </div>
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   )}
  </div>
 );
}
