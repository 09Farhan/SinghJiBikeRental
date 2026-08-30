import type { Metadata } from 'next';
import AdminLayoutWrapper from '@/components/layout/AdminLayoutWrapper';

export const metadata: Metadata = {
  title: {
    template: '%s | Admin - Singh Ji\'s Bike Rentals',
    default: 'Admin Dashboard',
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayoutWrapper>
      {children}
    </AdminLayoutWrapper>
  );
}
