'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatsCards from '@/components/admin/StatsCards';
import BookingsTable from '@/components/admin/BookingsTable';
import Button from '@/components/ui/Button';

const DEMO_STATS = {
  totalBikes: 8,
  totalUnits: 16,
  activeBookings: 5,
  totalRevenue: 127500,
  totalCustomers: 42,
  pendingBookings: 3
};

const DEMO_BOOKINGS = [
  { id: 'BK-001', customer: { name: 'Arjun Mehta', email: 'arjun@email.com', phone: '+919876543210' }, bikeUnit: { registrationNumber: 'KA-01-AB-1234', color: 'Black', bike: { name: 'BMW G 310 GS', brand: 'BMW' } }, startDate: '2024-03-15', endDate: '2024-03-18', totalDays: 3, totalAmount: 6000, status: 'ACTIVE', createdAt: '2024-03-14' },
  { id: 'BK-002', customer: { name: 'Priya Sharma', email: 'priya@email.com', phone: '+919876543211' }, bikeUnit: { registrationNumber: 'KA-01-CD-5678', color: 'Silver', bike: { name: 'Royal Enfield Classic 350', brand: 'Royal Enfield' } }, startDate: '2024-03-16', endDate: '2024-03-20', totalDays: 4, totalAmount: 4000, status: 'CONFIRMED', createdAt: '2024-03-15' },
  { id: 'BK-003', customer: { name: 'Rahul Kumar', email: 'rahul@email.com', phone: '+919876543212' }, bikeUnit: { registrationNumber: 'KA-01-EF-9012', color: 'Blue', bike: { name: 'KTM Duke 390', brand: 'KTM' } }, startDate: '2024-03-17', endDate: '2024-03-19', totalDays: 2, totalAmount: 3600, status: 'PENDING', createdAt: '2024-03-16' },
  { id: 'BK-004', customer: { name: 'Sneha Patel', email: 'sneha@email.com', phone: '+919876543213' }, bikeUnit: { registrationNumber: 'KA-01-GH-3456', color: 'White', bike: { name: 'Honda Activa 6G', brand: 'Honda' } }, startDate: '2024-03-10', endDate: '2024-03-12', totalDays: 2, totalAmount: 800, status: 'COMPLETED', createdAt: '2024-03-09' },
  { id: 'BK-005', customer: { name: 'Vikram Singh', email: 'vikram@email.com', phone: '+919876543214' }, bikeUnit: { registrationNumber: 'KA-01-IJ-7890', color: 'Red', bike: { name: 'Royal Enfield Himalayan', brand: 'Royal Enfield' } }, startDate: '2024-03-20', endDate: '2024-03-25', totalDays: 5, totalAmount: 7500, status: 'CONFIRMED', createdAt: '2024-03-18' },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState(DEMO_BOOKINGS);

  const handleStatusChange = (id: string, newStatus: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <div className="space-y-8 mt-[-64px]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <div className="flex space-x-4">
          <Button onClick={() => router.push('/admin/inventory')}>Add New Bike</Button>
          <Button variant="outline" onClick={() => router.push('/admin/bookings')}>View All Bookings</Button>
        </div>
      </div>

      <StatsCards stats={DEMO_STATS} />

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Recent Bookings</h2>
        <div className="bg-[#111827] border border-gray-700/50 rounded-2xl overflow-hidden">
          <BookingsTable bookings={bookings.slice(0, 5)} onStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
}
