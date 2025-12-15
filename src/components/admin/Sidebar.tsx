"use client";

import Link from 'next/link';
import NextImage from "next/image";
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, MapPin, FileText, Users, BookOpen, HelpCircle, Image, MessageSquare, UserCog, UserCircle, Mail } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  superAdminOnly?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="size-5" /> },
  { name: 'Events', href: '/admin/events', icon: <Calendar className="size-5" /> },
  { name: 'Locations', href: '/admin/locations', icon: <MapPin className="size-5" /> },
  { name: 'Event Registrations', href: '/admin/registrations', icon: <Users className="size-5" /> },
  { name: 'Form Submissions', href: '/admin/submissions', icon: <FileText className="size-5" /> },
  { name: 'Testimonials', href: '/admin/testimonials', icon: <MessageSquare className="size-5" /> },
  { name: 'Resources', href: '/admin/resources', icon: <BookOpen className="size-5" />, superAdminOnly: true },
  { name: 'FAQs', href: '/admin/faqs', icon: <HelpCircle className="size-5" />, superAdminOnly: true },
  { name: 'Images', href: '/admin/images', icon: <Image className="size-5" />, superAdminOnly: true },
  { name: 'Users', href: '/admin/users', icon: <UserCog className="size-5" />, superAdminOnly: true },
  { name: 'Profile', href: '/admin/profile', icon: <UserCircle className="size-5" /> },
  { name: 'Email Settings', href: '/admin/settings/email', icon: <Mail className="size-5" />, superAdminOnly: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isSuperAdmin = session?.user?.role === 'superadmin';
  const filteredNavItems = navItems.filter(item => !item.superAdminOnly || isSuperAdmin);

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <NextImage
            src="/assets/rpflogo.png"
            alt="CHH Logo"
            width={74}
            height={70}
            className="object-contain"
          />
          <span className="font-semibold text-gray-900">Admin Panel</span>
        </Link>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            return (
              <li key={item.name}>
                <Link href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {session?.user && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">{session.user.name?.charAt(0).toUpperCase() || 'A'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{session.user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{session.user.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
