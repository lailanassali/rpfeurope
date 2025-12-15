"use client";

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from '@/components/admin/Sidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <SessionProvider>
   <div className="min-h-screen bg-gray-50">
    <Sidebar />
    <div className="pl-64">
     <AdminHeader />
     <main className="pt-16">
      <div className="p-6">
       {children}
      </div>
     </main>
    </div>
   </div>
   <Toaster
    position="top-right"
    toastOptions={{
     duration: 4000,
     style: {
      background: '#fff',
      color: '#363636',
     },
     success: {
      style: {
       background: '#10B981',
       color: '#fff',
      },
     },
     error: {
      style: {
       background: '#EF4444',
       color: '#fff',
      },
     },
    }}
   />
  </SessionProvider>
 );
}
