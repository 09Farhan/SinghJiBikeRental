import type { Metadata } from 'next';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';

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
        <AdminHeader />
        {children}
      </main>
    </div>
  );
}
