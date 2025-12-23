"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { ChhButton } from '@/components/common/ChhButton';
import { X } from 'lucide-react';

interface AddUserModalProps {
 isOpen: boolean;
 onClose: () => void;
 onSuccess: () => void;
}

export function AddUserModal({ isOpen, onClose, onSuccess }: AddUserModalProps) {
 const [isLoading, setIsLoading] = useState(false);
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  role: 'admin',
 });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
   const res = await fetch('/api/admin/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
   });

   const data = await res.json();

   if (!res.ok) {
    throw new Error(data.error || 'Failed to create user');
   }

   toast.success('User created! Password setup email sent.');
   setFormData({ name: '', email: '', role: 'admin' });
   onSuccess();
  } catch (error: any) {
   toast.error(error.message || 'Failed to create user');
  } finally {
   setIsLoading(false);
  }
 };

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
   <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
    <div className="flex items-center justify-between mb-4">
     <h2 className="text-xl font-bold">Add New User</h2>
     <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
      <X className="size-5" />
     </button>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
     <FormInput
      label="Full Name"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      required
     />

     <FormInput
      label="Email"
      type="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      required
     />

     <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Role</label>
      <select
       value={formData.role}
       onChange={(e) => setFormData({ ...formData, role: e.target.value })}
       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white font-inherit"
      >
       <option value="admin">Admin</option>
       <option value="superadmin">Super Admin</option>
      </select>
     </div>

     <p className="text-sm text-gray-600">
      A password setup email will be sent to the user.
     </p>

     <div className="flex gap-4 justify-end pt-4">
      <ChhButton
       type="button"
       onClick={onClose}
       className="bg-gray-100 text-gray-700 px-6 py-2 h-auto"
      >
       Cancel
      </ChhButton>
      <ChhButton
       type="submit"
       disabled={isLoading}
       className="bg-primary text-white px-6 py-2 h-auto"
      >
       {isLoading ? 'Creating...' : 'Create User'}
      </ChhButton>
     </div>
    </form>
   </div>
  </div>
 );
}
