'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import BookingForm from '@/components/booking/BookingForm';
import BookingSummary from '@/components/booking/BookingSummary';
import { useBooking } from '@/hooks/useBooking';
import Button from '@/components/ui/Button';

// Demo data fallback
const DEMO_BIKES = [
  { id: '1', name: 'BMW G 310 GS', slug: 'bmw-g310-gs', brand: 'BMW', category: 'BIKE', pricePerDay: 2000, engine: '313cc Single Cylinder', mileage: '30 kmpl', fuelType: 'PETROL', transmission: 'MANUAL', seatCapacity: 2, description: 'The BMW G 310 GS is an adventure-ready motorcycle...', images: ['/images/bikes/bmw-g310-gs-1.jpg'], isActive: true, availableUnits: 2 },
  { id: '2', name: 'Royal Enfield Classic 350', slug: 'royal-enfield-classic-350', brand: 'Royal Enfield', category: 'BIKE', pricePerDay: 1000, engine: '349cc Single Cylinder', mileage: '35 kmpl', fuelType: 'PETROL', transmission: 'MANUAL', seatCapacity: 2, description: 'The timeless Classic 350...', images: ['/images/bikes/royal-enfield-classic-350-1.jpg'], isActive: true, availableUnits: 3 },
  { id: '3', name: 'Royal Enfield Himalayan', slug: 'royal-enfield-himalayan', brand: 'Royal Enfield', category: 'BIKE', pricePerDay: 1500, engine: '411cc Single Cylinder', mileage: '30 kmpl', fuelType: 'PETROL', transmission: 'MANUAL', seatCapacity: 2, description: 'Built for adventure...', images: ['/images/bikes/royal-enfield-himalayan-1.jpg'], isActive: true, availableUnits: 2 },
  { id: '4', name: 'KTM Duke 390', slug: 'ktm-duke-390', brand: 'KTM', category: 'BIKE', pricePerDay: 1800, engine: '373cc Single Cylinder', mileage: '25 kmpl', fuelType: 'PETROL', transmission: 'MANUAL', seatCapacity: 2, description: 'Street-naked sportbike...', images: ['/images/bikes/ktm-duke-390-1.jpg'], isActive: true, availableUnits: 1 },
  { id: '5', name: 'TVS Apache RTR 160', slug: 'tvs-apache-rtr-160', brand: 'TVS', category: 'BIKE', pricePerDay: 800, engine: '159.7cc Single Cylinder', mileage: '45 kmpl', fuelType: 'PETROL', transmission: 'MANUAL', seatCapacity: 2, description: 'Sporty performance...', images: ['/images/bikes/tvs-apache-rtr-160-1.jpg'], isActive: true, availableUnits: 2 },
  { id: '6', name: 'Honda Activa 6G', slug: 'honda-activa-6g', brand: 'Honda', category: 'SCOOTER', pricePerDay: 400, engine: '109.51cc Single Cylinder', mileage: '60 kmpl', fuelType: 'PETROL', transmission: 'AUTOMATIC', seatCapacity: 2, description: 'Most trusted scooter...', images: ['/images/bikes/honda-activa-6g-1.jpg'], isActive: true, availableUnits: 3 },
  { id: '7', name: 'Suzuki Access 125', slug: 'suzuki-access-125', brand: 'Suzuki', category: 'SCOOTER', pricePerDay: 450, engine: '124cc Single Cylinder', mileage: '55 kmpl', fuelType: 'PETROL', transmission: 'AUTOMATIC', seatCapacity: 2, description: 'Premium scooter experience...', images: ['/images/bikes/suzuki-access-125-1.jpg'], isActive: true, availableUnits: 2 },
  { id: '8', name: 'Yamaha Aerox 155', slug: 'yamaha-aerox-155', brand: 'Yamaha', category: 'SCOOTER', pricePerDay: 600, engine: '155cc Single Cylinder', mileage: '40 kmpl', fuelType: 'PETROL', transmission: 'AUTOMATIC', seatCapacity: 2, description: 'Sportbike in scooter form...', images: ['/images/bikes/yamaha-aerox-155-1.jpg'], isActive: true, availableUnits: 1 }
];

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get('bike');
  
  const [bike, setBike] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (slug) {
      const foundBike = DEMO_BIKES.find(b => b.slug === slug);
      if (foundBike) {
        setBike(foundBike);
      }
    }
    setLoading(false);
  }, [slug]);

  const { 
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
        <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-heading font-bold text-white mb-4">Vehicle Not Found</h2>
        <p className="text-gray-400 mb-8">Please select a vehicle from our fleet to continue.</p>
        <Link href="/bikes">
          <Button className="bg-orange-500 text-white hover:bg-orange-600">Browse Fleet</Button>
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
          Thank you for choosing Singh Ji's Bike Rental. We have sent the booking details to your email.
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
          onSubmit={(data) => {
            console.log('Booking submitted', data);
            setBookingSuccess(true);
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
            <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        }>
          <BookingContent />
        </Suspense>
      </div>
    </main>
  );
}
