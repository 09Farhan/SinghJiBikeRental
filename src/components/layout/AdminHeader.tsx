'use client';

import { useState } from 'react';
import ChangePasswordModal from '@/components/admin/ChangePasswordModal';

export default function AdminHeader() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="flex justify-end items-center mb-8">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setIsPasswordModalOpen(true)}
          className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors"
        >
          Change Password
        </button>
        <span className="text-gray-300 font-medium">Admin</span>
        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
          AD
        </div>
      </div>
      
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
    </div>
  );
}
