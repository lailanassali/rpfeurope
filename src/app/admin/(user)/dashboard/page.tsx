"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Calendar, MapPin, FileText, Users, TrendingUp, Eye } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StatsData {
 events: number;
 locations: number;
 submissions: number;
 registrations: number;
 resources?: number;
 images?: number;
}

interface ChartData {
 [key: string]: any;
 name: string;
 value: number;
}

export default function AdminDashboard() {
 const { data: session } = useSession();
 const isSuperAdmin = session?.user?.role === 'superadmin';
 const [stats, setStats] = useState<StatsData>({
  events: 0,
  locations: 0,
  submissions: 0,
  registrations: 0,
  resources: 0,
  images: 0,
 });
 const [isLoading, setIsLoading] = useState(true);
 const [submissionChartData, setSubmissionChartData] = useState<ChartData[]>([]);
 const [registrationTrend, setRegistrationTrend] = useState<ChartData[]>([]);

 useEffect(() => {
  fetchStats();
  fetchChartData();
 }, []);

 async function fetchStats() {
  try {
   const [eventsRes, locationsRes, submissionsRes, registrationsRes] = await Promise.all([
    fetch('/api/admin/events').then(r => r.json()),
    fetch('/api/admin/locations').then(r => r.json()),
    fetch('/api/admin/submissions').then(r => r.json()),
    fetch('/api/admin/registrations').then(r => r.json()),
   ]);

   setStats({
    events: Array.isArray(eventsRes) ? eventsRes.length : 0,
    locations: Array.isArray(locationsRes) ? locationsRes.length : 0,
    submissions: Array.isArray(submissionsRes) ? submissionsRes.length : 0,
    registrations: Array.isArray(registrationsRes) ? registrationsRes.length : 0,
   });
  } catch (error) {
   console.error('Failed to fetch stats:', error);
  } finally {
   setIsLoading(false);
  }
 }

 async function fetchChartData() {
  try {
   const submissionsRes = await fetch('/api/admin/submissions').then(r => r.json());
   const registrationsRes = await fetch('/api/admin/registrations').then(r => r.json());

   // Process submission data by form type
   if (Array.isArray(submissionsRes)) {
    const formTypeCounts: Record<string, number> = {};
    submissionsRes.forEach((sub: any) => {
     const type = sub.form_type;
     formTypeCounts[type] = (formTypeCounts[type] || 0) + 1;
    });

    const chartData = Object.entries(formTypeCounts).map(([name, value]) => ({
     name: name.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
     value,
    }));
    setSubmissionChartData(chartData);
   }

   // Process registration trend (last 7 days)
   if (Array.isArray(registrationsRes)) {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
     const date = new Date();
     date.setDate(date.getDate() - (6 - i));
     return date.toISOString().split('T')[0];
    });

    const trendData = last7Days.map(date => {
     const count = registrationsRes.filter((reg: any) =>
      reg.registered_at?.startsWith(date)
     ).length;
     return {
      name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      value: count,
     };
    });
    setRegistrationTrend(trendData);
   }
  } catch (error) {
   console.error('Failed to fetch chart data:', error);
  }
 }

 const statCards = [
  {
   title: 'Total Events',
   value: stats.events,
   icon: <Calendar className="size-6" />,
   color: 'bg-blue-500',
   link: '/admin/events',
  },
  {
   title: 'Locations',
   value: stats.locations,
   icon: <MapPin className="size-6" />,
   color: 'bg-green-500',
   link: '/admin/locations',
  },
  {
   title: 'Form Submissions',
   value: stats.submissions,
   icon: <FileText className="size-6" />,
   color: 'bg-purple-500',
   link: '/admin/submissions',
  },
  {
   title: 'Event Registrations',
   value: stats.registrations,
   icon: <Users className="size-6" />,
   color: 'bg-orange-500',
   link: '/admin/registrations',
  },
 ];

 const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d1'];

 return (
  <div>
   {/* Header */}
   <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
    <p className="text-gray-600 mt-2">
     Welcome back, {session?.user?.name}! Here's what's happening with your site.
    </p>
   </div>

   {/* Stats Grid */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {statCards.map((stat, index) => (
     <a
      key={index}
      href={stat.link}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
     >
      <div className="flex items-center justify-between">
       <div>
        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
         {isLoading ? '...' : stat.value}
        </p>
        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
         <Eye className="size-3" />
         View all
        </p>
       </div>
       <div className={`${stat.color} p-3 rounded-lg`}>
        <div className="text-white">{stat.icon}</div>
       </div>
      </div>
     </a>
    ))}
   </div>

   {/* Charts Section */}
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    {/* Submission Types Chart */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
     <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <TrendingUp className="size-5 text-primary" />
      Submissions by Form Type
     </h2>
     {submissionChartData.length > 0 ? (
      <ResponsiveContainer width="100%" height={300}>
       <PieChart>
        <Pie
         data={submissionChartData}
         cx="50%"
         cy="50%"
         labelLine={false}
         label={({ name, percent }) => `${name}: ${(percent && percent * 100 || 0).toFixed(0)}%`}
         outerRadius={80}
         fill="#8884d8"
         dataKey="value"
        >
         {submissionChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
         ))}
        </Pie>
        <Tooltip />
       </PieChart>
      </ResponsiveContainer>
     ) : (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
       No submission data yet
      </div>
     )}
    </div>

    {/* Registration Trend */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
     <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <Users className="size-5 text-primary" />
      Registration Trend (Last 7 Days)
     </h2>
     {registrationTrend.length > 0 ? (
      <ResponsiveContainer width="100%" height={300}>
       <BarChart data={registrationTrend}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" stroke="#888" fontSize={12} />
        <YAxis stroke="#888" fontSize={12} />
        <Tooltip
         contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
         cursor={{ fill: 'rgba(89, 66, 123, 0.1)' }}
        />
        <Bar dataKey="value" fill="#59427B" radius={[8, 8, 0, 0]} />
       </BarChart>
      </ResponsiveContainer>
     ) : (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
       No registration data yet
      </div>
     )}
    </div>
   </div>

   {/* Quick Actions */}
   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
     Quick Actions
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
     <a
      href="/admin/events/add"
      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
     >
      <Calendar className="size-5 text-primary" />
      <span className="font-medium text-gray-900">Add New Event</span>
     </a>
     <a
      href="/admin/locations/add"
      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
     >
      <MapPin className="size-5 text-primary" />
      <span className="font-medium text-gray-900">Add New Location</span>
     </a>
     <a
      href="/admin/submissions"
      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
     >
      <FileText className="size-5 text-primary" />
      <span className="font-medium text-gray-900">View Submissions</span>
     </a>
    </div>
   </div>

   {/* System Status */}
   <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
    <p className="text-sm text-green-800 flex items-center gap-2">
     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
     <strong>System Status:</strong> All systems operational. Last updated: {new Date().toLocaleString()}
    </p>
   </div>
  </div>
 );
}
