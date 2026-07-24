'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatsCards from '@/components/admin/StatsCards';
import BookingsTable from '@/components/admin/BookingsTable';
import Button from '@/components/ui/Button';

export default function DashboardClient({ initialStats, initialBookings }: { initialStats: any, initialBookings: any[] }) {
  const router = useRouter();
  const [bookings, setBookings] = useState(initialBookings);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBookings(bookings.filter(b => b.id !== id));
      } else {
        alert('Failed to delete booking');
      }
    } catch (error) {
      console.error('Failed to delete booking', error);
      alert('Error deleting booking');
    }
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

      <StatsCards stats={initialStats} />

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Recent Bookings</h2>
        <div className="bg-[#111827] border border-gray-700/50 rounded-2xl overflow-hidden">
          {bookings.length > 0 ? (
            <BookingsTable bookings={bookings.slice(0, 5)} onStatusChange={handleStatusChange} onDeleteBooking={handleDeleteBooking} />
          ) : (
            <div className="p-8 text-center text-gray-400">No recent bookings</div>
          )}
        </div>
      </div>
    </div>
  );
}
