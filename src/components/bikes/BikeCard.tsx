import React from 'react';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatCurrency, cn } from '@/lib/utils';

interface BikeCardProps {
  bike: any;
  index?: number;
}

export default function BikeCard({ bike, index = 0 }: BikeCardProps) {
  return (
    <div
      className="rounded-2xl bg-[#111827] border border-gray-700/50 overflow-hidden group hover:border-orange-500/30 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-52 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden flex items-center justify-center">
        {bike.images?.[0] ? (
          <img src={bike.images[0]} alt={bike.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <svg className="w-32 h-32 text-gray-600 opacity-50 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 12v4c0 .6.4 1 1 1h2m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m0 0c.3 0 .7.1 1 .2m7-.2a2 2 0 104 0m-4 0a2 2 0 114 0m-4 0c-.3 0-.7.1-1 .2m0 0H8.3" />
          </svg>
        )}
        <span className="absolute bottom-4 left-0 right-0 text-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg uppercase tracking-widest">{bike.name}</span>
        
        <div className="absolute top-3 right-3">
            <Badge variant={bike.availableUnits > 0 ? "success" : "danger"}>
              {bike.availableUnits > 0 ? `${bike.availableUnits} Left` : 'Sold Out'}
            </Badge>
        </div>
        
        <div className="absolute top-3 left-3">
             <Badge variant="default" className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              {bike.category}
            </Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <p className="text-orange-400 text-xs uppercase tracking-wider font-medium mb-1">
            {bike.brand}
          </p>
          <h3 className="text-lg font-heading font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
            {bike.name}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            {bike.engine}
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            {bike.mileage}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-gray-400 text-xs">Starting from</p>
            <p className="text-orange-400 text-xl font-bold">
              {formatCurrency(bike.pricePerDay)}<span className="text-sm font-normal text-gray-500">/day</span>
            </p>
          </div>
        </div>
        
        <Link href={`/bikes/${bike.slug}`} className="block mt-2">
            <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 py-2">
                Book Now
            </Button>
        </Link>
      </div>
    </div>
  );
}
