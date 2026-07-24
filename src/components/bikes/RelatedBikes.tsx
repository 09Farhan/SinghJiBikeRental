import React from 'react';
import BikeCard from './BikeCard';

interface RelatedBikesProps {
  currentSlug: string;
  bikes: any[];
}

export default function RelatedBikes({ currentSlug, bikes }: RelatedBikesProps) {
  const related = bikes.filter(b => b.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-800">
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-white">You May Also Like</h2>
        <p className="text-gray-400 mt-2">Discover more premium rides from our fleet.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((bike, idx) => (
          <BikeCard key={bike.id} bike={bike} index={idx} />
        ))}
      </div>
    </section>
  );
}
