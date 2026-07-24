'use client';
import React, { useMemo } from 'react';
import BikeFilters from '@/components/bikes/BikeFilters';
import BikeCard from '@/components/bikes/BikeCard';
import { useFilters } from '@/hooks/useFilters';

// Demo data for the catalog
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

export default function BikesCatalog() {
  const { filters, setFilter, clearFilters, filteredBikes } = useFilters(DEMO_BIKES);

  // Extract unique brands from demo data
  const brands = useMemo(() => {
    const brandSet = new Set(DEMO_BIKES.map(b => b.brand));
    return Array.from(brandSet).sort();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-1/4 sticky top-24">
        <BikeFilters 
          filters={filters} 
          onFilterChange={setFilter} 
          brands={brands}
          clearFilters={clearFilters}
        />
      </aside>

      {/* Main Grid */}
      <div className="w-full lg:w-3/4">
        <div className="mb-6 flex justify-between items-center text-sm text-gray-400">
          <p>Showing <strong className="text-white">{filteredBikes.length}</strong> vehicles</p>
        </div>

        {filteredBikes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBikes.map((bike, idx) => (
              <BikeCard key={bike.id} bike={bike} index={idx} />
            ))}
          </div>
        ) : (
          <div className="bg-[#111827] rounded-3xl p-12 text-center border border-gray-700/50">
            <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-heading font-semibold text-white mb-2">No vehicles found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters to find what you're looking for.</p>
            <button 
              onClick={clearFilters}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
