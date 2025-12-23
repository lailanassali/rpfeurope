"use client";

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import NextImage from "next/image";

export default function ForgotPasswordPage() {
 const [email, setEmail] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
   const response = await fetch('/api/auth/request-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
   });

   const data = await response.json();

   if (!response.ok) {
    throw new Error(data.error || 'Failed to request password reset');
   }

   setIsSuccess(true);
   toast.success('Reset link sent!');
  } catch (error: any) {
   toast.error(error.message || 'An error occurred. Please try again.');
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center px-4">
   <div className="max-w-md w-full">
    {/* Logo/Brand */}
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
     <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
     <p className="text-gray-600 mt-2">Enter your email to receive a reset link</p>
    </div>

    {/* Form or Success Message */}
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
     {isSuccess ? (
      <div className="text-center space-y-4">
       <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
       </div>
       <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
       <p className="text-sm text-gray-500">
        If an account exists for {email}, we have sent a password reset link to it.
       </p>
       <div className="pt-4">
        <Link
         href="/admin/login"
         className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2"
        >
         <ArrowLeft className="size-4" />
         Back to Login
        </Link>
       </div>
      </div>
     ) : (
      <form onSubmit={handleSubmit} className="space-y-6">
       <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
         Email Address
        </label>
        <input
         id="email"
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
         disabled={isLoading}
         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
         placeholder="admin@chh.com"
        />
       </div>

       <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
       >
        {isLoading ? 'Sending...' : 'Send Reset Link'}
       </button>

       <div className="text-center pt-2">
        <Link
         href="/admin/login"
         className="text-gray-500 hover:text-gray-700 text-sm inline-flex items-center gap-2"
        >
         <ArrowLeft className="size-4" />
         Back to Login
        </Link>
       </div>
      </form>
     )}
    </div>

    {/* Footer */}
    <p className="text-center text-gray-500 text-sm mt-6">
     © {new Date().getFullYear()} Christ Healing Home. All rights reserved.
    </p>
   </div>
  </div>
 );
}
