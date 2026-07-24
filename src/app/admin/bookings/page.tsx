'use client';

import { useState } from 'react';
import BookingsTable from '@/components/admin/BookingsTable';
import Input from '@/components/ui/Input';

const DEMO_BOOKINGS = [
  { id: 'BK-001', customer: { name: 'Arjun Mehta', email: 'arjun@email.com', phone: '+919876543210' }, bikeUnit: { registrationNumber: 'KA-01-AB-1234', color: 'Black', bike: { name: 'BMW G 310 GS', brand: 'BMW' } }, startDate: '2024-03-15', endDate: '2024-03-18', totalDays: 3, totalAmount: 6000, status: 'ACTIVE', createdAt: '2024-03-14' },
  { id: 'BK-002', customer: { name: 'Priya Sharma', email: 'priya@email.com', phone: '+919876543211' }, bikeUnit: { registrationNumber: 'KA-01-CD-5678', color: 'Silver', bike: { name: 'Royal Enfield Classic 350', brand: 'Royal Enfield' } }, startDate: '2024-03-16', endDate: '2024-03-20', totalDays: 4, totalAmount: 4000, status: 'CONFIRMED', createdAt: '2024-03-15' },
  { id: 'BK-003', customer: { name: 'Rahul Kumar', email: 'rahul@email.com', phone: '+919876543212' }, bikeUnit: { registrationNumber: 'KA-01-EF-9012', color: 'Blue', bike: { name: 'KTM Duke 390', brand: 'KTM' } }, startDate: '2024-03-17', endDate: '2024-03-19', totalDays: 2, totalAmount: 3600, status: 'PENDING', createdAt: '2024-03-16' },
  { id: 'BK-004', customer: { name: 'Sneha Patel', email: 'sneha@email.com', phone: '+919876543213' }, bikeUnit: { registrationNumber: 'KA-01-GH-3456', color: 'White', bike: { name: 'Honda Activa 6G', brand: 'Honda' } }, startDate: '2024-03-10', endDate: '2024-03-12', totalDays: 2, totalAmount: 800, status: 'COMPLETED', createdAt: '2024-03-09' },
  { id: 'BK-005', customer: { name: 'Vikram Singh', email: 'vikram@email.com', phone: '+919876543214' }, bikeUnit: { registrationNumber: 'KA-01-IJ-7890', color: 'Red', bike: { name: 'Royal Enfield Himalayan', brand: 'Royal Enfield' } }, startDate: '2024-03-20', endDate: '2024-03-25', totalDays: 5, totalAmount: 7500, status: 'CONFIRMED', createdAt: '2024-03-18' },
  { id: 'BK-006', customer: { name: 'Anita Desai', email: 'anita@email.com', phone: '+919876543215' }, bikeUnit: { registrationNumber: 'KA-01-KL-2345', color: 'Grey', bike: { name: 'TVS Apache RTR 160', brand: 'TVS' } }, startDate: '2024-03-12', endDate: '2024-03-13', totalDays: 1, totalAmount: 800, status: 'CANCELLED', createdAt: '2024-03-11' }
];

const TABS = ['All', 'Pending', 'Confirmed', 'Active', 'Completed', 'Cancelled'];

export default function BookingsPage() {
  const [bookings, setBookings] = useState(DEMO_BOOKINGS);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (id: string, newStatus: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const filteredBookings = bookings.filter(b => {
    const matchesTab = activeTab === 'All' || b.status === activeTab.toUpperCase();
    const matchesSearch = b.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 mt-[-64px]">
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

      <div className="bg-[#111827] border border-gray-700/50 rounded-2xl overflow-hidden">
        <BookingsTable bookings={filteredBookings} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}
