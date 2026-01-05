"use client";

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { SidebarProvider, useSidebar } from '@/context/SidebarContext';
import { Sidebar } from '@/components/admin/Sidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import NextTopLoader from 'nextjs-toploader';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
 const { isOpen, close } = useSidebar();

 return (
  <div className="min-h-screen bg-gray-50">
   <Sidebar />

   {/* Mobile Overlay */}
   {isOpen && (
    <div
     className="fixed inset-0 bg-black/50 z-40 md:hidden"
     onClick={close}
    />
   )}

   <div className="pl-0 md:pl-64 transition-[padding] duration-300">
    <AdminHeader />
    <main className="pt-16">
     <div className="p-4 md:p-6">
      {children}
     </div>
    </main>
   </div>
  </div>
 );
}

export default function AdminLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <SessionProvider>
   <SidebarProvider>
    <NextTopLoader color="#6F5299" height={3} showSpinner={false} />
    <AdminLayoutContent children={children} />
   </SidebarProvider>
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
