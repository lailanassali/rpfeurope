"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { ChhButton } from '@/components/common/ChhButton';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordPage() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const token = searchParams.get('token');

 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  if (!token) {
   toast.error('Invalid reset link');
   router.push('/admin/login');
  }
 }, [token, router]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password.length < 8) {
   toast.error('Password must be at least 8 characters');
   return;
  }

  if (password !== confirmPassword) {
   toast.error('Passwords do not match');
   return;
  }

  setIsLoading(true);

  try {
   const res = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
   });

   const data = await res.json();

   if (!res.ok) {
    throw new Error(data.error || 'Failed to reset password');
   }

   toast.success('Password reset successfully!');
   router.push('/admin/login');
  } catch (error: any) {
   toast.error(error.message || 'Failed to reset password');
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-md w-full space-y-8">
    <div className="text-center">
     <h2 className="mt-6 text-3xl font-bold text-gray-900">
      Set Your Password
     </h2>
     <p className="mt-2 text-sm text-gray-600">
      Create a secure password for your account
     </p>
    </div>

    <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow">
     <div className="relative">
      <FormInput
       label="New Password"
       type={showPassword ? "text" : "password"}
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       required
       placeholder="Enter new password"
      />
      <button
       type="button"
       onClick={() => setShowPassword(!showPassword)}
       className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
      >
       {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
     </div>

     <div className="relative">
      <FormInput
       label="Confirm Password"
       type={showConfirmPassword ? "text" : "password"}
       value={confirmPassword}
       onChange={(e) => setConfirmPassword(e.target.value)}
       required
       placeholder="Confirm your password"
      />
      <button
       type="button"
       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
       className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
      >
       {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
     </div>

     <div className="text-sm text-gray-600">
      <p>Password must be at least 8 characters long</p>
     </div>

     <ChhButton
      type="submit"
      disabled={isLoading}
      className="w-full bg-primary text-white hover:bg-primary/90 h-12"
     >
      {isLoading ? 'Resetting...' : 'Reset Password'}
     </ChhButton>
    </form>
   </div>
  </div>
 );
}
