"use client";

import { signOut, useSession } from 'next-auth/react';
import { LogOut, Bell, Menu } from 'lucide-react';
import { RPFButton } from '@/components/common/RPFButton';
import { useSidebar } from '@/context/SidebarContext';

export function AdminHeader() {
 const { data: session } = useSession();
 const { toggle } = useSidebar();

 const handleLogout = async () => {
  await signOut({ callbackUrl: '/admin/login' });
 };

 return (
  <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-0 md:left-64 z-10 transition-[left] duration-300">
   <div className="h-full px-4 md:px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
     <button
      onClick={toggle}
      className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden"
     >
      <Menu className="size-6" />
     </button>

     {/* Page Title - can be customized per page */}
     <h2 className="text-xl font-semibold text-gray-900 truncate">
      <span className="md:hidden">Welcome back, {session?.user?.name?.charAt(0)}</span>
      <span className="hidden md:inline">Welcome back, {session?.user?.name}</span>
     </h2>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-4">
     {/* Notifications (future feature) */}
     <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
      <Bell className="size-5" />
     </button>

     {/* Logout */}
     <RPFButton
      onClick={handleLogout}
      className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 md:px-4 py-2 h-auto"
     >
      <LogOut className="size-4" />
      <span className="hidden md:inline text-sm">Logout</span>
     </RPFButton>
    </div>
   </div>
  </header>
 );
}
