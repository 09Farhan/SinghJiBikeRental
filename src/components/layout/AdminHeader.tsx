'use client';

import { useState } from 'react';
import ChangePasswordModal from '@/components/admin/ChangePasswordModal';

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="flex justify-between md:justify-end items-center mb-8">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={onMenuClick}
        className="md:hidden text-gray-300 hover:text-white p-2 -ml-2"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setIsPasswordModalOpen(true)}
          className="text-sm text-amber-400 hover:text-orange-300 font-medium transition-colors"
        >
          Change Password
        </button>
        <span className="text-gray-300 font-medium">Admin</span>
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
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
