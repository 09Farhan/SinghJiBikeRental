'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function SearchWidget() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    pickupDate: '',
    pickupTime: '',
    dropDate: '',
    dropTime: '',
    category: 'All',
    location: 'Siliguri',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (formData.category !== 'All') {
      params.append('category', formData.category);
    }
    if (formData.location) {
      params.append('location', formData.location);
    }
    // We append the parameters to the /bikes route
    router.push(`/bikes?${params.toString()}`);
  };

  const baseInputClass = "w-full min-w-0 appearance-none bg-[#0a0e1a] shadow-neu-pressed border border-gray-800 rounded-xl px-3 sm:px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all [color-scheme:dark] cursor-pointer";
  const selectInputClass = baseInputClass; // appearance-none is already in baseInputClass now
  const labelClass = "block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider";

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if ('showPicker' in e.currentTarget) {
      try {
        (e.currentTarget as HTMLInputElement).showPicker();
      } catch (err) {
        // Ignored
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 -mt-16 sm:-mt-20 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
      <div className="bg-[#111827] rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-700/50 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 lg:items-end">
          
          {/* Dates & Times */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 flex-grow">
            <div>
              <label className={labelClass}>Pick Up Date</label>
              <input 
                type="date" 
                className={baseInputClass}
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                onClick={handleInputClick}
              />
            </div>
            <div>
              <label className={labelClass}>Time</label>
              <input 
                type="time" 
                className={baseInputClass}
                value={formData.pickupTime}
                onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                onClick={handleInputClick}
              />
            </div>
            <div>
              <label className={labelClass}>Drop Date</label>
              <input 
                type="date" 
                className={baseInputClass}
                value={formData.dropDate}
                onChange={(e) => setFormData({ ...formData, dropDate: e.target.value })}
                onClick={handleInputClick}
              />
            </div>
            <div>
              <label className={labelClass}>Time</label>
              <input 
                type="time" 
                className={baseInputClass}
                value={formData.dropTime}
                onChange={(e) => setFormData({ ...formData, dropTime: e.target.value })}
                onClick={handleInputClick}
              />
            </div>
          </div>

          {/* Type & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-[400px] shrink-0">
            <div>
              <label className={labelClass}>Vehicle Type</label>
              <div className="relative">
                <select 
                  className={selectInputClass}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="All">All Vehicles</option>
                  <option value="Bikes">Bikes</option>
                  <option value="Scooters">Scooters</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <div className="relative">
                <select 
                  className={selectInputClass}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                >
                  <option value="Siliguri">Siliguri</option>
                  <option value="Bagdogra">Bagdogra Airport</option>
                  <option value="NJP">NJP Railway</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="shrink-0 lg:w-40 pt-2 lg:pt-0">
            <Button type="submit" fullWidth size="md" className="py-[14px]">
              Find Ride
            </Button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
