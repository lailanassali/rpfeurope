"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, UserCheck, UserX } from 'lucide-react';
import { ChhButton } from '@/components/common/ChhButton';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { AddUserModal } from '@/components/admin/AddUserModal';

export default function UsersPage() {
 const [users, setUsers] = useState<any[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [showAddModal, setShowAddModal] = useState(false);
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const [isDeleting, setIsDeleting] = useState(false);

 useEffect(() => {
  fetchUsers();
 }, []);

 async function fetchUsers() {
  try {
   const res = await fetch('/api/admin/users');
   if (!res.ok) throw new Error();
   setUsers(await res.json());
  } catch (error) {
   toast.error('Failed to load users');
  } finally {
   setIsLoading(false);
  }
 }

 async function handleToggleActive(userId: string, currentStatus: boolean) {
  try {
   const res = await fetch(`/api/admin/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ is_active: !currentStatus }),
   });

   if (!res.ok) throw new Error();
   toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'}`);
   fetchUsers();
  } catch (error) {
   toast.error('Failed to update user');
  }
 }

 async function handleDelete() {
  if (!deleteId) return;
  setIsDeleting(true);
  try {
   const res = await fetch(`/api/admin/users/${deleteId}`, { method: 'DELETE' });
   if (!res.ok) throw new Error();
   toast.success('User deleted');
   setUsers(users.filter(u => u.id !== deleteId));
   setDeleteId(null);
  } catch (error) {
   toast.error('Failed to delete user');
  } finally {
   setIsDeleting(false);
  }
 }

 return (
  <div>
   <div className="flex items-center justify-between mb-6">
    <div>
     <h1 className="text-2xl font-bold">Users</h1>
     <p className="text-gray-600 mt-1">Manage admin users</p>
    </div>
    <ChhButton
     onClick={() => setShowAddModal(true)}
     className="flex items-center gap-2 bg-primary text-white px-4 py-2 h-auto"
    >
     <Plus className="size-4" />
     Add User
    </ChhButton>
   </div>

   <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
    <table className="w-full">
     <thead className="bg-gray-50 border-b">
      <tr>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
      </tr>
     </thead>
     <tbody className="divide-y">
      {isLoading ? (
       <tr><td colSpan={6} className="px-6 py-12 text-center"><div className="flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div></td></tr>
      ) : users.length === 0 ? (
       <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No users found</td></tr>
      ) : (
       users.map((user) => (
        <tr key={user.id} className="hover:bg-gray-50">
         <td className="px-6 py-4 font-medium">{user.name}</td>
         <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
         <td className="px-6 py-4">
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
           {user.role === 'superadmin' ? 'Super Admin' : 'Admin'}
          </span>
         </td>
         <td className="px-6 py-4">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
           {user.is_active ? 'Active' : 'Inactive'}
          </span>
         </td>
         <td className="px-6 py-4 text-sm text-gray-700">
          {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
         </td>
         <td className="px-6 py-4 text-right">
          <div className="flex gap-2 justify-end">
           <button
            onClick={() => handleToggleActive(user.id, user.is_active)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title={user.is_active ? 'Deactivate' : 'Activate'}
           >
            {user.is_active ? <UserX className="size-4 text-orange-600" /> : <UserCheck className="size-4 text-green-600" />}
           </button>
           <button
            onClick={() => setDeleteId(user.id)}
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
           >
            <Trash2 className="size-4" />
           </button>
          </div>
         </td>
        </tr>
       ))
      )}
     </tbody>
    </table>
   </div>

   <AddUserModal
    isOpen={showAddModal}
    onClose={() => setShowAddModal(false)}
    onSuccess={() => {
     setShowAddModal(false);
     fetchUsers();
    }}
   />

   <ConfirmDialog
    isOpen={deleteId !== null}
    onClose={() => setDeleteId(null)}
    onConfirm={handleDelete}
    title="Delete User"
    message="Are you sure you want to delete this user? This action cannot be undone."
    variant="danger"
    isLoading={isDeleting}
   />
  </div>
 );
}
