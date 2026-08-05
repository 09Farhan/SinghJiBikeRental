import { Metadata } from 'next';
import BikesCatalog from './BikesCatalog';
import { BikeService } from '@/services/bike.service';

export const metadata: Metadata = {
  title: 'Our Fleet - Premium Bikes & Scooters for Rent',
  description: 'Browse our premium fleet of motorcycles and scooters. Book your perfect ride with Singh Ji\'s Bike Rental.',
};
// Force dynamic to always fetch fresh bikes from DB
export const dynamic = 'force-dynamic';

export default async function BikesPage() {
  const bikes = await BikeService.getAllBikes();

  return (
    <main className="min-h-screen bg-[#0a0e1a] pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">Fleet</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Find your perfect ride. From powerful superbikes to nimble scooters, we have something for every journey.
          </p>
        </div>

        <BikesCatalog bikes={bikes} />
      </div>
    </main>
  );
}
