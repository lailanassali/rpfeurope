"use client";

import { signOut, useSession } from 'next-auth/react';
import { LogOut, Bell } from 'lucide-react';
import { ChhButton } from '@/components/common/ChhButton';

export function AdminHeader() {
 const { data: session } = useSession();

 const handleLogout = async () => {
  await signOut({ callbackUrl: '/admin/login' });
 };

 return (
  <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-64 z-10">
   <div className="h-full px-6 flex items-center justify-between">
    {/* Page Title - can be customized per page */}
    <div>
     <h2 className="text-xl font-semibold text-gray-900">
      Welcome back, {session?.user?.name}
     </h2>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-4">
     {/* Notifications (future feature) */}
     <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
      <Bell className="size-5" />
     </button>

     {/* Logout */}
     <ChhButton
      onClick={handleLogout}
      className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 h-auto"
     >
      <LogOut className="size-4" />
      <span className="text-sm">Logout</span>
     </ChhButton>
    </div>
   </div>
  </header>
 );
}
