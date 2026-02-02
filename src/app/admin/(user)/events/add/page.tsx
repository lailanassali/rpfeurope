import { EventForm } from '@/components/admin/EventForm';

export default function AddEventPage() {
 return (
  <div>
   <div className="mb-6">
    <h1 className="text-2xl font-bold text-gray-900">Add New Event</h1>
    <p className="text-gray-600 mt-1">Create a new event for the RPF calendar</p>
   </div>

   <EventForm />
  </div>
 );
}
