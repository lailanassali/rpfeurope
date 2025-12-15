"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { ChhButton } from '@/components/common/ChhButton';
import { Mail } from 'lucide-react';

export default function EmailConfigPage() {
 const [isLoading, setIsLoading] = useState(false);
 const [isFetching, setIsFetching] = useState(true);
 const [formData, setFormData] = useState({
  primary_email: '',
  cc_emails: '',
 });

 useEffect(() => {
  fetchConfig();
 }, []);

 async function fetchConfig() {
  try {
   const res = await fetch('/api/admin/email-config');
   if (!res.ok) throw new Error();
   const data = await res.json();
   setFormData({
    primary_email: data.primary_email || '',
    cc_emails: data.cc_emails || '',
   });
  } catch (error) {
   toast.error('Failed to load email configuration');
  } finally {
   setIsFetching(false);
  }
 }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
   const res = await fetch('/api/admin/email-config', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
   });

   if (!res.ok) throw new Error();
   toast.success('Email configuration updated!');
  } catch (error) {
   toast.error('Failed to update configuration');
  } finally {
   setIsLoading(false);
  }
 };

 if (isFetching) {
  return (
   <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
   </div>
  );
 }

 return (
  <div>
   <div className="mb-6">
    <h1 className="text-2xl font-bold">Email Configuration</h1>
    <p className="text-gray-600 mt-1">Configure email notifications for form submissions</p>
   </div>

   <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 space-y-6 max-w-2xl">
    <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
     <Mail className="size-5 text-blue-600 mt-1" />
     <div className="text-sm text-blue-900">
      <p className="font-semibold mb-1">Email Notification Settings</p>
      <p>Configure where form submission notifications are sent. All form submissions will trigger an email to these addresses.</p>
     </div>
    </div>

    <FormInput
     label="Primary Email"
     type="email"
     value={formData.primary_email}
     onChange={(e) => setFormData({ ...formData, primary_email: e.target.value })}
     required
     placeholder="admin@chheurope.com"
    />

    <div>
     <FormTextarea
      label="CC Emails (separated by |)"
      value={formData.cc_emails}
      onChange={(e) => setFormData({ ...formData, cc_emails: e.target.value })}
      rows={3}
      placeholder="team@chheurope.com|support@chheurope.com"
     />
     <p className="text-sm text-gray-600 mt-2">
      Separate multiple emails with a pipe character (|). These addresses will be CC'd on all form notifications.
     </p>
    </div>

    <div className="bg-gray-50 p-4 rounded-lg">
     <p className="text-sm font-semibold text-gray-900 mb-2">Example:</p>
     <p className="text-sm text-gray-700">
      When someone submits a form, emails will be sent to:
     </p>
     <ul className="text-sm text-gray-700 mt-2 space-y-1">
      <li>• <strong>To:</strong> {formData.primary_email || 'primary@example.com'}</li>
      <li>• <strong>CC:</strong> {formData.cc_emails || 'No CC emails configured'}</li>
     </ul>
    </div>

    <div className="flex gap-4 justify-end pt-4">
     <ChhButton
      type="submit"
      disabled={isLoading}
      className="bg-primary text-white px-6 py-2 h-auto"
     >
      {isLoading ? 'Saving...' : 'Save Configuration'}
     </ChhButton>
    </div>
   </form>
  </div>
 );
}
