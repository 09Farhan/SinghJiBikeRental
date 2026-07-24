'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import BookingsTable from '@/components/admin/BookingsTable';
import Input from '@/components/ui/Input';

const TABS = ['All', 'Pending', 'Confirmed', 'Active', 'Completed', 'Cancelled'];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
        toast.success('Status updated successfully');
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Failed to update status', error);
      toast.error('Failed to update status');
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBookings(bookings.filter(b => b.id !== id));
        toast.success('Booking deleted successfully');
      } else {
        toast.error('Failed to delete booking');
      }
    } catch (error) {
      console.error('Failed to delete booking', error);
      toast.error('Error deleting booking');
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesTab = activeTab === 'All' || b.status === activeTab.toUpperCase();
    const customerName = b.customer?.name || '';
    const bookingId = b.id || '';
    
    const matchesSearch = customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Manage Bookings</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-[#111827] text-gray-400 hover:text-white border border-gray-700/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="w-full md:w-72">
          <Input 
            placeholder="Search booking ID or customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[#111827] border border-gray-700/50 rounded-2xl overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <BookingsTable bookings={filteredBookings} onStatusChange={handleStatusChange} onDeleteBooking={handleDeleteBooking} />
        )}
      </div>
    </div>
  );
}
