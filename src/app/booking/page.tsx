'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import BookingForm from '@/components/booking/BookingForm';
import BookingSummary from '@/components/booking/BookingSummary';
import { useBooking } from '@/hooks/useBooking';
import Button from '@/components/ui/Button';

function BookingContent({ initialBike }: { initialBike: any }) {
  const router = useRouter();
  const [bike, setBike] = useState<any>(initialBike);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);  const { 
    startDate, 
    endDate, 
    totalDays, 
    totalAmount,
    setStartDate,
    setEndDate,
    step,
    setStep
  } = useBooking(bike?.pricePerDay || 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-heading font-bold text-white mb-4">Vehicle Not Found</h2>
        <p className="text-gray-400 mb-8">Please select a vehicle from our fleet to continue.</p>
        <Link href="/bikes">
          <Button className="bg-amber-500 text-white hover:bg-amber-600">Browse Fleet</Button>
        </Link>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 px-4">
        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-4xl font-heading font-bold text-white mb-4">Booking Confirmed!</h2>
        <p className="text-gray-400 text-lg mb-8">
          Thank you for choosing Singh Ji's Bike Rentals. We have sent the booking details to your email.
        </p>
        <div className="bg-[#111827] border border-gray-700/50 rounded-2xl p-6 mb-8 text-left">
           <h4 className="text-white font-medium mb-2 border-b border-gray-700 pb-2">Next Steps</h4>
           <ul className="space-y-3 text-sm text-gray-400 list-disc list-inside">
             <li>Please arrive at our store 15 minutes before your pickup time.</li>
             <li>Bring your original Driving License and Aadhar Card.</li>
             <li>Have the security deposit ready (Cash/UPI accepted).</li>
           </ul>
        </div>
        <Link href="/">
          <Button className="bg-gray-800 text-white hover:bg-gray-700">Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <BookingForm 
          bike={bike}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onSubmit={async (data) => {
            setBookingError(null);
            try {
              const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
              });
              const json = await res.json();
              if (json.success) {
                setBookingSuccess(true);
              } else {
                setBookingError(json.error || 'Failed to submit booking');
              }
            } catch (err: any) {
              setBookingError(err.message || 'An error occurred');
            }
          }} 
        />
      </div>
      
      <div className="lg:col-span-1">
        <BookingSummary 
          bike={bike}
          startDate={startDate}
          endDate={endDate}
          totalDays={totalDays}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#0a0e1a] pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">Complete Your Booking</h1>
          <p className="text-gray-400">Fast, secure, and hassle-free.</p>
        </div>
        
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
          </div>
        }>
          <BookingContentWrapper />
        </Suspense>
      </div>
    </main>
  );
}

// Wrapper component to handle useSearchParams inside Suspense
function BookingContentWrapper() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('bike');
  const [bike, setBike] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetch(`/api/bikes`, { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const foundBike = data.data.find((b: any) => b.slug === slug);
            setBike(foundBike);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return <BookingContent initialBike={bike} />;
}
