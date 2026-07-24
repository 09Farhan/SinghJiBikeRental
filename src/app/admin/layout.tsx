import type { Metadata } from 'next';
import AdminSidebar from '@/components/layout/AdminSidebar';

export const metadata: Metadata = {
  title: {
    template: '%s | Admin - Singh Ji\'s Bike Rental',
    default: 'Admin Dashboard',
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex bg-[#0a0e1a]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-[#0a0e1a] p-8">
        <div className="flex justify-end items-center mb-8">
          <div className="flex items-center space-x-3">
            <span className="text-gray-300 font-medium">Admin</span>
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              AD
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
