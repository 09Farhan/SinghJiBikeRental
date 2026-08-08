import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Assuming BikeFiltersType matches the one in types
export type BikeFiltersType = {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
};

export function useFilters(initialBikes: any[]) {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<BikeFiltersType>({
    category: searchParams?.get('category') || 'All',
  });

  const setFilter = (key: keyof BikeFiltersType, value: any) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      if (!value || value === 'All') {
          delete newFilters[key];
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({ category: 'All' });
  };

  const filteredBikes = useMemo(() => {
    return initialBikes
      .filter((bike) => {
        if (filters.category && filters.category !== 'All' && bike.category !== (filters.category === 'Bikes' ? 'BIKE' : 'SCOOTER')) {
          return false;
        }
        if (filters.brand && bike.brand !== filters.brand) {
          return false;
        }
        if (filters.minPrice && bike.pricePerDay < filters.minPrice) {
          return false;
        }
        if (filters.maxPrice && bike.pricePerDay > filters.maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'Price: Low to High') return a.pricePerDay - b.pricePerDay;
        if (filters.sortBy === 'Price: High to Low') return b.pricePerDay - a.pricePerDay;
        if (filters.sortBy === 'Name: A-Z') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [initialBikes, filters]);

  return { filters, setFilter, clearFilters, filteredBikes };
}
