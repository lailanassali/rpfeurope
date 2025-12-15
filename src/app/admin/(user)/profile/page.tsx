"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { ChhButton } from '@/components/common/ChhButton';
import { Eye, EyeOff } from 'lucide-react';

export default function ProfilePage() {
 const [isLoading, setIsLoading] = useState(false);
 const [showCurrentPassword, setShowCurrentPassword] = useState(false);
 const [showNewPassword, setShowNewPassword] = useState(false);
 const [formData, setFormData] = useState({
  full_name: '',
  current_password: '',
  new_password: '',
  confirm_password: '',
 });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.new_password && formData.new_password !== formData.confirm_password) {
   toast.error('New passwords do not match');
   return;
  }

  if (formData.new_password && formData.new_password.length < 8) {
   toast.error('Password must be at least 8 characters');
   return;
  }

  setIsLoading(true);

  try {
   const body: any = { full_name: formData.full_name };

   if (formData.new_password) {
    body.current_password = formData.current_password;
    body.new_password = formData.new_password;
   }

   const res = await fetch('/api/admin/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
   });

   const data = await res.json();

   if (!res.ok) {
    throw new Error(data.error || 'Failed to update profile');
   }

   toast.success('Profile updated successfully!');
   setFormData({
    ...formData,
    current_password: '',
    new_password: '',
    confirm_password: '',
   });
  } catch (error: any) {
   toast.error(error.message || 'Failed to update profile');
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div>
   <div className="mb-6">
    <h1 className="text-2xl font-bold">Profile Settings</h1>
    <p className="text-gray-600 mt-1">Update your personal information and password</p>
   </div>

   <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 space-y-6 max-w-2xl">
    <div>
     <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
     <FormInput
      label="Full Name"
      value={formData.full_name}
      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
      required
     />
    </div>

    <hr />

    <div>
     <h3 className="text-lg font-semibold mb-4">Change Password</h3>
     <p className="text-sm text-gray-600 mb-4">Leave blank if you don't want to change your password</p>

     <div className="space-y-4">
      <div className="relative">
       <FormInput
        label="Current Password"
        type={showCurrentPassword ? "text" : "password"}
        value={formData.current_password}
        onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
       />
       <button
        type="button"
        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
        className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
       >
        {showCurrentPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
       </button>
      </div>

      <div className="relative">
       <FormInput
        label="New Password"
        type={showNewPassword ? "text" : "password"}
        value={formData.new_password}
        onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
       />
       <button
        type="button"
        onClick={() => setShowNewPassword(!showNewPassword)}
        className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
       >
        {showNewPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
       </button>
      </div>

      <FormInput
       label="Confirm New Password"
       type="password"
       value={formData.confirm_password}
       onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
      />
     </div>
    </div>

    <div className="flex gap-4 justify-end pt-4">
     <ChhButton
      type="submit"
      disabled={isLoading}
      className="bg-primary text-white px-6 py-2 h-auto"
     >
      {isLoading ? 'Saving...' : 'Save Changes'}
     </ChhButton>
    </div>
   </form>
  </div>
 );
}
