'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BikeGalleryProps {
  images?: string[];
  bikeName: string;
}

export default function BikeGallery({ images, bikeName }: BikeGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Create 3 placeholder gradients if no real images
  const placeholders = [
    'from-gray-700 to-gray-800',
    'from-gray-800 to-gray-900',
    'from-gray-700 to-orange-900/20'
  ];

  const hasImages = images && images.length > 0;
  const displayItems = hasImages ? images : placeholders;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Main Image */}
      <div className={cn(
        "relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden flex items-center justify-center bg-gradient-to-br transition-all duration-500 border border-gray-700/50",
        !hasImages && placeholders[selectedIndex]
      )}>
        {hasImages ? (
          <Image src={images[selectedIndex]} alt={`${bikeName} - ${selectedIndex + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        ) : (
          <>
            <svg className="w-64 h-64 text-gray-600 opacity-50 drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 12v4c0 .6.4 1 1 1h2m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m0 0c.3 0 .7.1 1 .2m7-.2a2 2 0 104 0m-4 0a2 2 0 114 0m-4 0c-.3 0-.7.1-1 .2m0 0H8.3" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white/20 font-bold text-4xl md:text-6xl uppercase tracking-widest text-center rotate-[-15deg] max-w-full truncate px-8">
                  {bikeName}
                </span>
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-4">
        {displayItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={cn(
              "relative h-24 rounded-2xl overflow-hidden flex items-center justify-center border-2 transition-all duration-300",
              !hasImages && item,
              selectedIndex === idx ? "border-amber-500 opacity-100" : "border-gray-700/50 opacity-60 hover:opacity-100 hover:border-gray-500"
            )}
          >
            {hasImages ? (
              <Image src={item} alt={`${bikeName} thumbnail ${idx + 1}`} fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover" />
            ) : (
              <svg className="w-12 h-12 text-gray-500 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 12v4c0 .6.4 1 1 1h2m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m0 0c.3 0 .7.1 1 .2m7-.2a2 2 0 104 0m-4 0a2 2 0 114 0m-4 0c-.3 0-.7.1-1 .2m0 0H8.3" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
