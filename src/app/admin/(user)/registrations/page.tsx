"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Download, Filter } from 'lucide-react';
import { FormSelect } from '@/components/common/FormSelect';
import { ChhButton } from '@/components/common/ChhButton';

export default function RegistrationsPage() {
 const [registrations, setRegistrations] = useState<any[]>([]);
 const [events, setEvents] = useState<any[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [eventFilter, setEventFilter] = useState('');

 useEffect(() => {
  fetchEvents();
  fetchRegistrations();
 }, [eventFilter]);

 async function fetchEvents() {
  try {
   const res = await fetch('/api/admin/events');
   if (res.ok) {
    setEvents(await res.json());
   }
  } catch (error) {
   console.error('Failed to load events');
  }
 }

 async function fetchRegistrations() {
  try {
   const url = eventFilter ? `/api/admin/registrations?event_id=${eventFilter}` : '/api/admin/registrations';
   const res = await fetch(url);
   if (!res.ok) throw new Error();
   setRegistrations(await res.json());
  } catch (error) {
   toast.error('Failed to load registrations');
  } finally {
   setIsLoading(false);
  }
 }

 const downloadCSV = () => {
  const headers = ['Name', 'Email', 'Phone', 'Event', 'Registered At'];
  const csvData = registrations.map(reg => [
   reg.name,
   reg.email,
   reg.phone,
   reg.events?.title || 'N/A',
   new Date(reg.registered_at).toLocaleString()
  ]);

  const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `event-registrations-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  toast.success('CSV downloaded');
 };

 return (
  <div>
   <div className="flex items-center justify-between mb-6">
    <div>
     <h1 className="text-2xl font-bold">Event Registrations</h1>
     <p className="text-gray-600 mt-1">View all event registrations</p>
    </div>
    <ChhButton
     onClick={downloadCSV}
     disabled={registrations.length === 0}
     className="flex items-center gap-2 bg-primary text-white px-4 py-2 h-auto"
    >
     <Download className="size-4" />
     Export CSV
    </ChhButton>
   </div>

   <div className="mb-6">
    <div className="flex items-center gap-2">
     <Filter className="size-5 text-gray-400" />
     <FormSelect
      label="Filter by Event"
      value={eventFilter}
      onChange={(e) => setEventFilter(e.target.value)}
      options={[
       { value: '', label: 'All Events' },
       ...events.map(e => ({ value: e.id, label: e.title }))
      ]}
     />
    </div>
   </div>

   <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
    <table className="w-full">
     <thead className="bg-gray-50 border-b">
      <tr>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
      </tr>
     </thead>
     <tbody className="divide-y">
      {isLoading ? (
       <tr><td colSpan={5} className="px-6 py-12 text-center"><div className="flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div></td></tr>
      ) : registrations.length === 0 ? (
       <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">No registrations found</td></tr>
      ) : (
       registrations.map((reg) => (
        <tr key={reg.id} className="hover:bg-gray-50">
         <td className="px-6 py-4 font-medium">{reg.name}</td>
         <td className="px-6 py-4 text-sm text-gray-700">{reg.email}</td>
         <td className="px-6 py-4 text-sm text-gray-700">{reg.phone}</td>
         <td className="px-6 py-4">
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
           {reg.events?.title || 'Unknown'}
          </span>
         </td>
         <td className="px-6 py-4 text-sm text-gray-700">
          {new Date(reg.registered_at).toLocaleString()}
         </td>
        </tr>
       ))
      )}
     </tbody>
    </table>
   </div>
  </div>
 );
}
