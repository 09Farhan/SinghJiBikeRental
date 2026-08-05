'use client';
import React from 'react';
import { cn, calculateDays } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export default function DateRangePicker({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange 
}: DateRangePickerProps) {
  
  // Get tomorrow's date string for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minStartDate = tomorrow.toISOString().split('T')[0];

  // Min end date is either startDate + 1 day or tomorrow + 1 day
  const getMinEndDate = () => {
    if (startDate) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    }
    const d = new Date(tomorrow);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    onStartDateChange(newStart);
    
    // Auto adjust end date if it's before or equal to new start date
    if (endDate && newStart) {
      const s = new Date(newStart);
      const e = new Date(endDate);
      if (e <= s) {
        s.setDate(s.getDate() + 1);
        onEndDateChange(s.toISOString().split('T')[0]);
      }
    }
  };

  const days = (startDate && endDate) ? calculateDays(new Date(startDate), new Date(endDate)) : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pick-up Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Pick-up Date</label>
          <div className="relative">
            <input
              type="date"
              min={minStartDate}
              value={startDate}
              onChange={handleStartChange}
              className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all [color-scheme:dark]"
              required
            />
          </div>
        </div>

        {/* Drop-off Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Drop-off Date</label>
          <div className="relative">
            <input
              type="date"
              min={getMinEndDate()}
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all [color-scheme:dark]"
              required
              disabled={!startDate}
            />
          </div>
        </div>
      </div>

      {days > 0 && (
        <div className="flex justify-center -mt-2">
          <Badge variant="default" className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-1.5">
            Duration: {days} {days === 1 ? 'day' : 'days'}
          </Badge>
        </div>
      )}
    </div>
  );
}
