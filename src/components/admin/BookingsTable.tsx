'use client';

import { formatCurrency, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface BookingsTableProps {
  bookings: any[];
  onStatusChange: (id: string, status: string) => void;
  onDeleteBooking?: (id: string) => void;
}

export default function BookingsTable({ bookings, onStatusChange, onDeleteBooking }: BookingsTableProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ACTIVE':
      case 'CONFIRMED':
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'default';
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#0a0e1a] text-gray-400 text-xs uppercase tracking-wider whitespace-nowrap">
            <th className="px-6 py-4 font-medium">Booking ID</th>
            <th className="px-6 py-4 font-medium">Customer</th>
            <th className="px-6 py-4 font-medium">Bike</th>
            <th className="px-6 py-4 font-medium">Dates</th>
            <th className="px-6 py-4 font-medium">Duration</th>
            <th className="px-6 py-4 font-medium">Amount</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-white/5 transition-colors whitespace-nowrap">
              <td className="px-6 py-4">
                <span className="text-amber-400 font-mono text-sm">{booking.id}</span>
              </td>
              <td className="px-6 py-4">
                <div className="text-white text-sm font-medium">{booking.customer.name}</div>
                <div className="text-gray-500 text-xs">{booking.customer.email}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-white text-sm">{booking.bikeUnit.bike.name}</div>
                <div className="text-gray-500 text-xs">{booking.bikeUnit.registrationNumber}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {booking.totalDays} days
              </td>
              <td className="px-6 py-4 text-sm text-white font-medium">
                {formatCurrency(booking.totalAmount)}
              </td>
              <td className="px-6 py-4">
                <Badge variant={getStatusVariant(booking.status)}>
                  {booking.status}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <select
                  value={booking.status}
                  onChange={(e) => onStatusChange(booking.id, e.target.value)}
                  className="bg-[#0a0e1a] shadow-neu-pressed border-none text-white text-xs rounded p-1.5 focus:ring-1 focus:ring-amber-500/50 outline-none"
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="ACTIVE">Active</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
                {onDeleteBooking && (
                  <button 
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this booking?')) {
                        onDeleteBooking(booking.id);
                      }
                    }}
                    className="ml-3 text-red-500 hover:text-red-400 p-1 align-middle"
                    title="Delete Booking"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
