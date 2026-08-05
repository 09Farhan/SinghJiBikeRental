'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import type { BikeFiltersType } from '@/hooks/useFilters';
import Button from '@/components/ui/Button';

interface BikeFiltersProps {
  filters: BikeFiltersType;
  onFilterChange: (key: keyof BikeFiltersType, value: any) => void;
  brands: string[];
  clearFilters: () => void;
}

export default function BikeFilters({ filters, onFilterChange, brands, clearFilters }: BikeFiltersProps) {
  const categories = ['All', 'Bikes', 'Scooters'];
  
  const priceRanges = [
    { label: 'Any', min: undefined, max: undefined },
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
    { label: '₹2000+', min: 2000, max: undefined },
  ];

  const sortOptions = [
    'Newest',
    'Price: Low to High',
    'Price: High to Low',
    'Name: A-Z'
  ];

  return (
    <div className="bg-[#111827] rounded-2xl shadow-neu border border-gray-800 p-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heading font-semibold text-white">Filters</h3>
        <button onClick={clearFilters} className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange('category', cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                filters.category === cat || (!filters.category && cat === 'All')
                  ? "bg-amber-500/20 text-amber-400 shadow-neu-pressed"
                  : "bg-[#111827] text-gray-300 shadow-neu hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Brand</h4>
        <select 
          className="w-full bg-[#0a0e1a] shadow-neu-pressed text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all appearance-none"
          value={filters.brand || ''}
          onChange={(e) => onFilterChange('brand', e.target.value)}
        >
          <option value="">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Price per Day</h4>
        <div className="space-y-2">
          {priceRanges.map((range, idx) => {
             const isActive = filters.minPrice === range.min && filters.maxPrice === range.max;
             return (
               <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <div className={cn(
                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                    isActive ? "border-amber-500" : "border-gray-600 group-hover:border-gray-400"
                  )}>
                    {isActive && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
                  </div>
                  <input 
                    type="radio" 
                    className="hidden" 
                    checked={isActive}
                    onChange={() => {
                        onFilterChange('minPrice', range.min);
                        onFilterChange('maxPrice', range.max);
                    }}
                  />
                  <span className={cn(
                      "text-sm transition-colors",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                  )}>{range.label}</span>
               </label>
             );
          })}
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-3 pt-4 border-t border-gray-700/50">
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Sort By</h4>
        <select 
          className="w-full bg-[#0a0e1a] shadow-neu-pressed text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all appearance-none"
          value={filters.sortBy || ''}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
        >
          {sortOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

    </div>
  );
}
