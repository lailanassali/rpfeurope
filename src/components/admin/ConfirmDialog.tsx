"use client";

import { Modal } from './Modal';
import { RPFButton } from '@/components/common/RPFButton';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
 isOpen: boolean;
 onClose: () => void;
 onConfirm: () => void;
 title: string;
 message: string;
 confirmText?: string;
 cancelText?: string;
 isLoading?: boolean;
 variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmDialog({
 isOpen,
 onClose,
 onConfirm,
 title,
 message,
 confirmText = 'Confirm',
 cancelText = 'Cancel',
 isLoading = false,
 variant = 'warning',
}: ConfirmDialogProps) {
 const variantColors = {
  danger: 'text-red-600 bg-red-50',
  warning: 'text-yellow-600 bg-yellow-50',
  info: 'text-blue-600 bg-blue-50',
 };

 const buttonColors = {
  danger: 'bg-red-600 hover:bg-red-700',
  warning: 'bg-yellow-600 hover:bg-yellow-700',
  info: 'bg-blue-600 hover:bg-blue-700',
 };

 return (
  <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="md">
   <div className="space-y-4">
    {/* Icon */}
    <div className={`w-12 h-12 rounded-full ${variantColors[variant]} flex items-center justify-center`}>
     <AlertTriangle className="size-6" />
    </div>

    {/* Message */}
    <p className="text-gray-600">{message}</p>

    {/* Actions */}
    <div className="flex items-center gap-3 justify-end pt-4">
     <RPFButton
      onClick={onClose}
      disabled={isLoading}
      className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 h-auto"
     >
      {cancelText}
     </RPFButton>
     <RPFButton
      onClick={onConfirm}
      disabled={isLoading}
      className={`${buttonColors[variant]} text-white px-4 py-2 h-auto`}
     >
      {isLoading ? 'Processing...' : confirmText}
     </RPFButton>
    </div>
   </div>
  </Modal>
 );
}
