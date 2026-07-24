import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

const featuredBikes = [
  { name: 'BMW G 310 GS', price: 2000, category: 'Adventure', image: '/images/bikes/bmw-g310-gs-1.jpg', slug: 'bmw-g310-gs' },
  { name: 'Royal Enfield Classic 350', price: 1000, category: 'Cruiser', image: '/images/bikes/royal-enfield-classic-350-1.jpg', slug: 'royal-enfield-classic-350' },
  { name: 'KTM Duke 390', price: 1800, category: 'Sport', image: '/images/bikes/ktm-duke-390-1.jpg', slug: 'ktm-duke-390' },
  { name: 'Honda Activa 6G', price: 400, category: 'Scooter', image: '/images/bikes/honda-activa-6g-1.jpg', slug: 'honda-activa-6g' }
];

export default function FeaturedBikes() {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 inline-block relative">
            Our Featured Rides
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-orange-500 rounded-full"></div>
          </h2>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            Hand-picked bikes and scooters for every kind of rider
          </p>
        </div>

        {/* Bikes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredBikes.map((bike, index) => (
            <div 
              key={bike.slug}
              className="group rounded-2xl bg-[#111827] border border-gray-700/50 overflow-hidden hover:border-orange-500/30 transition-all hover:-translate-y-1 shadow-lg hover:shadow-orange-500/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Area placeholder */}
              <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative overflow-hidden">
                <svg className="w-24 h-24 text-gray-600 opacity-50 group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5.5 16a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"></path>
                  <path d="M18.5 16a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"></path>
                  <path d="M15.5 16h-11"></path>
                  <path d="M9 16v-5l2-4h5l3 4v5"></path>
                  <path d="M14 11h-3"></path>
                  <path d="M6.5 11l-2 5"></path>
                </svg>
                {/* Decorative overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col h-full">
                <span className="text-xs font-semibold text-amber-500 bg-amber-500/10 px-2 py-1 rounded w-fit mb-3">
                  {bike.category}
                </span>
                <h3 className="text-lg font-heading font-semibold text-white mb-2">
                  {bike.name}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <p className="text-orange-400 font-bold">
                    From {formatCurrency ? formatCurrency(bike.price) : `₹${bike.price}`}/day
                  </p>
                  <Link 
                    href={`/bikes/${bike.slug}`}
                    className="text-orange-500 hover:text-orange-400 font-medium text-sm transition-colors flex items-center gap-1 group-hover:translate-x-1 duration-300"
                  >
                    View Details <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            href="/bikes"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-orange-500/50 text-orange-400 font-medium hover:bg-orange-500/10 transition-colors"
          >
            View All Bikes <span aria-hidden="true" className="ml-2">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
