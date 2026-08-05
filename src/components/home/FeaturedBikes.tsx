import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { BikeService } from '@/services/bike.service';

export default async function FeaturedBikes() {
  // Fetch up to 4 bikes for the featured section
  const bikes = await BikeService.getAllBikes();
  const featuredBikes = bikes.slice(0, 4);
  return (
    <section className="py-24 px-4 md:px-8 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 inline-block relative">
            Our Featured Rides
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-amber-500 rounded-full"></div>
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
              className="group rounded-2xl bg-[#111827] border border-gray-700/50 overflow-hidden hover:border-amber-500/30 transition-all hover:-translate-y-1 shadow-lg hover:shadow-amber-500/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Area */}
              <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative overflow-hidden">
                {bike.images?.[0] ? (
                  <img src={bike.images[0]} alt={bike.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <svg className="w-24 h-24 text-gray-600 opacity-50 group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.5 16a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"></path>
                    <path d="M18.5 16a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"></path>
                    <path d="M15.5 16h-11"></path>
                    <path d="M9 16v-5l2-4h5l3 4v5"></path>
                    <path d="M14 11h-3"></path>
                    <path d="M6.5 11l-2 5"></path>
                  </svg>
                )}
                {/* Decorative overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col h-full">
                <span className="text-xs font-semibold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded w-fit mb-3">
                  {bike.category}
                </span>
                <h3 className="text-lg font-heading font-semibold text-white mb-2">
                  {bike.name}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <p className="text-amber-400 font-bold">
                    From {formatCurrency ? formatCurrency(bike.pricePerDay) : `₹${bike.pricePerDay}`}/day
                  </p>
                  <Link 
                    href={`/bikes/${bike.slug}`}
                    className="text-amber-500 hover:text-amber-400 font-medium text-sm transition-colors flex items-center gap-1 group-hover:translate-x-1 duration-300"
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
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-amber-500/50 text-amber-400 font-medium hover:bg-amber-500/10 transition-colors"
          >
            View All Bikes <span aria-hidden="true" className="ml-2">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
