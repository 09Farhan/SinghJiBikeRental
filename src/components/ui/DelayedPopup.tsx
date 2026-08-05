'use client';

import { useState, useEffect } from 'react';
import Button from './Button';

export default function DelayedPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(true); // Default to true to prevent hydration mismatch, set in useEffect
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredBike: '',
    pickupLocation: '',
    rentalDate: '',
    message: '',
  });

  useEffect(() => {
    // Check if user has seen the popup in this session
    const seen = sessionStorage.getItem('hasSeenPopup');
    if (!seen) {
      setHasSeen(false);
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // 3 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenPopup', 'true');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'POPUP_LEAD' }),
      });

      if (!res.ok) throw new Error('Failed to submit lead');

      setSubmitStatus('success');
      // Keep it open to show success message, then close after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasSeen || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div className="relative w-full max-w-md bg-[#111827] border border-gray-700/50 rounded-2xl shadow-2xl shadow-amber-500/10 overflow-hidden animate-fade-in-up z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1f2937] to-[#111827] p-6 border-b border-gray-700/50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Plan Your Ride</h2>
            <p className="text-sm text-gray-400 mt-1">Get a quick callback with availability & pricing.</p>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700 p-2 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
              <p className="text-gray-400">We'll be in touch with you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg">
                  Something went wrong. Please try again.
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0a0e1a] border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0a0e1a] border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                    placeholder="+91..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#0a0e1a] border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Preferred Bike</label>
                  <select
                    name="preferredBike"
                    value={formData.preferredBike}
                    onChange={handleChange}
                    className="w-full bg-[#0a0e1a] border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500 appearance-none"
                  >
                    <option value="">Select (Any)</option>
                    <option value="scooter">Scooter</option>
                    <option value="cruiser">Cruiser / Royal Enfield</option>
                    <option value="sports">Sports Bike</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Rental Date</label>
                  <input
                    type="date"
                    name="rentalDate"
                    value={formData.rentalDate}
                    onChange={handleChange}
                    className="w-full bg-[#0a0e1a] border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Pickup Location</label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full bg-[#0a0e1a] border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                  placeholder="e.g. Airport, Hotel Name"
                />
              </div>

              <Button type="submit" fullWidth disabled={isSubmitting} className="mt-2">
                {isSubmitting ? 'Submitting...' : 'Check Availability'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
