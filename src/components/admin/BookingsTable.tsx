'use client';

import { formatCurrency, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface BookingsTableProps {
  bookings: any[];
  onStatusChange: (id: string, status: string) => void;
}

export default function BookingsTable({ bookings, onStatusChange }: BookingsTableProps) {
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
          <tr className="bg-[#1f2937] text-gray-400 text-xs uppercase tracking-wider">
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
            <tr key={booking.id} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4">
                <span className="text-orange-400 font-mono text-sm">{booking.id}</span>
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
                  className="bg-[#1f2937] border border-gray-700 text-white text-xs rounded p-1.5 focus:ring-1 focus:ring-orange-500 outline-none"
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="ACTIVE">Active</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
