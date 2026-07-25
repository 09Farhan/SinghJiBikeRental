'use client';
import React, { useMemo } from 'react';
import BikeFilters from '@/components/bikes/BikeFilters';
import BikeCard from '@/components/bikes/BikeCard';
import { useFilters } from '@/hooks/useFilters';

export default function BikesCatalog({ bikes }: { bikes: any[] }) {
  const { filters, setFilter, clearFilters, filteredBikes } = useFilters(bikes);

  // Extract unique brands from data
  const brands = useMemo(() => {
    const brandSet = new Set(bikes.map(b => b.brand));
    return Array.from(brandSet).sort();
  }, [bikes]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 z-30">
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
