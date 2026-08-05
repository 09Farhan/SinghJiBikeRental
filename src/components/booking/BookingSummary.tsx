import React from 'react';
import Image from 'next/image';
import { formatCurrency, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface BookingSummaryProps {
  bike: any;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmount: number;
}

export default function BookingSummary({ 
  bike, 
  startDate, 
  endDate, 
  totalDays, 
  totalAmount 
}: BookingSummaryProps) {
  return (
    <div className="bg-[#111827] rounded-3xl p-6 md:p-8 border border-gray-700/50 sticky top-24 animate-fade-in">
      <h3 className="text-xl font-heading font-semibold text-white mb-6 border-b border-gray-800 pb-4">
        Booking Summary
      </h3>

      <div className="flex gap-4 mb-6">
        <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center shrink-0 border border-gray-700 overflow-hidden relative">
          {bike.images?.[0] ? (
            <Image src={bike.images[0]} alt={bike.name} fill sizes="96px" className="object-cover" />
          ) : (
            <svg className="w-12 h-12 text-gray-600 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 12v4c0 .6.4 1 1 1h2m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m-4 0c-.3 0-.7.1-1 .2m7-.2a2 2 0 104 0m-4 0a2 2 0 114 0m-4 0c-.3 0-.7.1-1 .2m0 0H8.3" />
            </svg>
          )}
        </div>
        <div>
          <Badge variant="default" className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-1">
            {bike.brand}
          </Badge>
          <h4 className="text-lg font-heading font-semibold text-white line-clamp-2">
            {bike.name}
          </h4>
          <p className="text-sm text-gray-500 mt-1">{bike.category}</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-3 border-b border-gray-800">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pick-up</p>
            <p className="text-white font-medium">{startDate ? formatDate(startDate) : '--'}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Drop-off</p>
            <p className="text-white font-medium">{endDate ? formatDate(endDate) : '--'}</p>
          </div>
        </div>

        <div className="flex justify-between items-center text-gray-400 text-sm">
          <span>Rental Duration</span>
          <span className="text-white font-medium">{totalDays} {totalDays === 1 ? 'Day' : 'Days'}</span>
        </div>

        <div className="flex justify-between items-center text-gray-400 text-sm">
          <span>Rate (Per Day)</span>
          <span className="text-white font-medium">{formatCurrency(bike.pricePerDay)}</span>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700 mb-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-400 mb-1">Total Amount</p>
            <p className="text-xs text-gray-500">Includes all taxes (GST)</p>
          </div>
          <p className="text-3xl font-bold text-amber-400">
            {formatCurrency(totalAmount)}
          </p>
        </div>
      </div>

      <div className="text-xs text-gray-500 space-y-2">
        <p className="flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Refundable security deposit will be collected at the time of pickup.
        </p>
        <p className="flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          Free cancellation up to 24 hours before pickup.
        </p>
      </div>
    </div>
  );
}
