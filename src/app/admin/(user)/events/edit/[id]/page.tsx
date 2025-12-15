"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { EventForm } from '@/components/admin/EventForm';
import { toast } from 'react-hot-toast';

export default function EditEventPage() {
 const params = useParams();
 const eventId = params.id as string;
 const [event, setEvent] = useState(null);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  async function fetchEvent() {
   try {
    const response = await fetch(`/api/admin/events/${eventId}`);
    if (!response.ok) throw new Error('Failed to fetch event');
    const data = await response.json();
    setEvent(data);
   } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to load event');
   } finally {
    setIsLoading(false);
   }
  }

  fetchEvent();
 }, [eventId]);

 if (isLoading) {
  return (
   <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
   </div>
  );
 }

 if (!event) {
  return (
   <div className="text-center py-12">
    <p className="text-gray-600">Event not found</p>
   </div>
  );
 }

 return (
  <div>
   <div className="mb-6">
    <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
    <p className="text-gray-600 mt-1">Update event details</p>
   </div>

   <EventForm initialData={event} eventId={eventId} />
  </div>
 );
}
