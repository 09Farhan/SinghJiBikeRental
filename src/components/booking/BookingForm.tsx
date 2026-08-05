'use client';
import React, { useState } from 'react';
import DateRangePicker from './DateRangePicker';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface BookingFormProps {
  bike: any;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onSubmit: (data: any) => Promise<void>;
}

export default function BookingForm({ 
  bike, 
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSubmit 
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add +91 to customer phone before submitting
    const fullPhone = formData.customerPhone.startsWith('+') 
      ? formData.customerPhone 
      : `+91${formData.customerPhone}`;

    await onSubmit({
      ...formData,
      customerPhone: fullPhone,
      startDate,
      endDate,
      bikeId: bike.id
    });
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="bg-[#111827] rounded-3xl p-6 md:p-8 border border-gray-700/50 space-y-6">
        <h3 className="text-xl font-heading font-semibold text-white border-b border-gray-800 pb-4">
          1. Select Rental Dates
        </h3>
        <DateRangePicker 
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      </div>

      <div className="bg-[#111827] rounded-3xl p-6 md:p-8 border border-gray-700/50 space-y-6">
        <h3 className="text-xl font-heading font-semibold text-white border-b border-gray-800 pb-4">
          2. Personal Details
        </h3>
        
        <div className="space-y-4">
          <Input 
            label="Full Name"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="e.g. Rahul Singh"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Email Address"
              name="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="e.g. rahul@example.com"
              required
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Phone Number</label>
              <div className="relative flex">
                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-700 bg-gray-800 text-gray-400 sm:text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  placeholder="9876543210"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Special Requests (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Any specific requirements like extra helmets?"
              className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
            />
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-lg py-6 shadow-lg shadow-amber-500/20"
        loading={isSubmitting}
        disabled={!startDate || !endDate}
      >
        Confirm Booking
      </Button>
    </form>
  );
}
