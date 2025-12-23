"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import NextImage from "next/image";

function ResetPasswordForm() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const token = searchParams.get('token');

 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  if (!token) {
   toast.error('Invalid or missing reset token');
   router.push('/admin/login');
  }
 }, [token, router]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
   toast.error("Passwords don't match");
   return;
  }

  if (password.length < 6) {
   toast.error('Password must be at least 6 characters');
   return;
  }

  setIsLoading(true);

  try {
   const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
   });

   const data = await response.json();

   if (!response.ok) {
    throw new Error(data.error || 'Failed to reset password');
   }

   toast.success('Password reset successfully! Please log in.');
   router.push('/admin/login');
  } catch (error: any) {
   toast.error(error.message || 'An error occurred. Please try again.');
  } finally {
   setIsLoading(false);
  }
 };

 if (!token) return null;

 return (
  <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
   <form onSubmit={handleSubmit} className="space-y-6">
    <div>
     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
      New Password
     </label>
     <div className="relative">
      <input
       id="password"
       type={showPassword ? 'text' : 'password'}
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       required
       disabled={isLoading}
       className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
       placeholder="••••••••"
      />
      <button
       type="button"
       onClick={() => setShowPassword(!showPassword)}
       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
       {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
     </div>
    </div>

    <div>
     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
      Confirm Password
     </label>
     <input
      id="confirmPassword"
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
      disabled={isLoading}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
      placeholder="••••••••"
     />
    </div>

    <button
     type="submit"
     disabled={isLoading}
     className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
     {isLoading ? 'Resetting...' : 'Reset Password'}
    </button>
   </form>
  </div>
 );
}

export default function ResetPasswordPage() {
 return (
  <div className="min-h-screen flex items-center justify-center px-4">
   <div className="max-w-md w-full">
    <div className="text-center mb-8">
     <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
      <NextImage
       src="/assets/rpflogo.png"
       alt="CHH Logo"
       width={74}
       height={70}
       className="object-contain"
      />
     </div>
     <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
     <p className="text-gray-600 mt-2">Enter your new password below</p>
    </div>

    <Suspense fallback={
     <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
      Loading...
     </div>
    }>
     <ResetPasswordForm />
    </Suspense>

    <p className="text-center text-gray-500 text-sm mt-6">
     © {new Date().getFullYear()} Christ Healing Home. All rights reserved.
    </p>
   </div>
  </div>
 );
}
