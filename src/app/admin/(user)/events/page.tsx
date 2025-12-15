"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { ChhButton } from '@/components/common/ChhButton';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

interface Event {
 id: string;
 title: string;
 slug: string;
 location: string;
 date: string;
 time: string;
 category: string;
}

export default function EventsListPage() {
 const router = useRouter();
 const [events, setEvents] = useState<Event[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const [isDeleting, setIsDeleting] = useState(false);

 useEffect(() => {
  fetchEvents();
 }, []);

 async function fetchEvents() {
  try {
   const response = await fetch('/api/admin/events');
   if (!response.ok) throw new Error('Failed to fetch events');
   const data = await response.json();
   setEvents(data);
  } catch (error) {
   console.error('Error:', error);
   toast.error('Failed to load events');
  } finally {
   setIsLoading(false);
  }
 }

 async function handleDelete() {
  if (!deleteId) return;
  setIsDeleting(true);

  try {
   const response = await fetch(`/api/admin/events/${deleteId}`, {
    method: 'DELETE',
   });

   if (!response.ok) throw new Error('Failed to delete event');

   toast.success('Event deleted successfully');
   setEvents(events.filter((e) => e.id !== deleteId));
   setDeleteId(null);
  } catch (error) {
   console.error('Error:', error);
   toast.error('Failed to delete event');
  } finally {
   setIsDeleting(false);
  }
 }

 const filteredEvents = events.filter((event) =>
  event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  event.location.toLowerCase().includes(searchQuery.toLowerCase())
 );

 return (
  <div>
   {/* Header */}
   <div className="flex items-center justify-between mb-6">
    <div>
     <h1 className="text-2xl font-bold text-gray-900">Events</h1>
     <p className="text-gray-600 mt-1">Manage all events</p>
    </div>
    <Link href="/admin/events/add">
     <ChhButton className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-4 py-2 h-auto">
      <Plus className="size-4" />
      Add Event
     </ChhButton>
    </Link>
   </div>

   {/* Search */}
   <div className="mb-6">
    <div className="relative">
     <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
     <input
      type="text"
      placeholder="Search events..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
     />
    </div>
   </div>

   {/* Table */}
   <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <table className="w-full">
     <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Event
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Location
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Date & Time
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Category
       </th>
       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
        Actions
       </th>
      </tr>
     </thead>
     <tbody className="divide-y divide-gray-200">
      {isLoading ? (
       <tr>
        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
         <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
         </div>
        </td>
       </tr>
      ) : filteredEvents.length === 0 ? (
       <tr>
        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
         No events found
        </td>
       </tr>
      ) : (
       filteredEvents.map((event) => (
        <tr key={event.id} className="hover:bg-gray-50">
         <td className="px-6 py-4">
          <div className="font-medium text-gray-900">{event.title}</div>
          <div className="text-sm text-gray-500">{event.slug}</div>
         </td>
         <td className="px-6 py-4 text-sm text-gray-700">{event.location}</td>
         <td className="px-6 py-4 text-sm text-gray-700">
          {new Date(event.date).toLocaleDateString()} at {event.time}
         </td>
         <td className="px-6 py-4">
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
           {event.category || 'General'}
          </span>
         </td>
         <td className="px-6 py-4 text-right">
          <div className="flex items-center gap-2 justify-end">
           <Link href={`/admin/events/edit/${event.id}`}>
            <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg">
             <Edit className="size-4" />
            </button>
           </Link>
           <button
            onClick={() => setDeleteId(event.id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
           >
            <Trash2 className="size-4" />
           </button>
          </div>
         </td>
        </tr>
       ))
      )}
     </tbody>
    </table>
   </div>

   {/* Delete Confirmation */}
   <ConfirmDialog
    isOpen={deleteId !== null}
    onClose={() => setDeleteId(null)}
    onConfirm={handleDelete}
    title="Delete Event"
    message="Are you sure you want to delete this event? This action cannot be undone."
    confirmText="Delete"
    variant="danger"
    isLoading={isDeleting}
   />
  </div>
 );
}
