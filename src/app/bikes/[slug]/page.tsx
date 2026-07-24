import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BikeGallery from '@/components/bikes/BikeGallery';
import BikeSpecs from '@/components/bikes/BikeSpecs';
import RelatedBikes from '@/components/bikes/RelatedBikes';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import { WHATSAPP_NUMBER } from '@/lib/constants';

import { BikeService } from '@/services/bike.service';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const bike = await BikeService.getBikeBySlug(params.slug);
  
  if (!bike) {
    return { title: 'Bike Not Found' };
  }

  return {
    title: `${bike.name} - Rent at ₹${bike.pricePerDay}/day`,
    description: bike.description,
  };
}

export default async function BikeDetailPage({ params }: { params: { slug: string } }) {
  const bike = await BikeService.getBikeBySlug(params.slug);
  const relatedBikes = await BikeService.getAllBikes({ category: bike?.category });

  if (!bike) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0e1a] pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-orange-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/bikes" className="hover:text-orange-400">Fleet</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-200">{bike.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div className="w-full">
            <BikeGallery images={bike.images} bikeName={bike.name} />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="default" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                {bike.brand}
              </Badge>
              <Badge variant="default" className="text-gray-300 border-gray-600">
                {bike.category}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
              {bike.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <Badge variant={(bike.availableUnits || 0) > 0 ? "success" : "danger"}>
                {(bike.availableUnits || 0) > 0 ? `${bike.availableUnits} Available` : 'Sold Out'}
              </Badge>
            </div>

            <div className="mb-8 p-6 bg-[#111827] rounded-3xl border border-gray-700/50 flex flex-col gap-2">
              <p className="text-gray-400 text-sm uppercase tracking-wider">Rental Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-orange-400">{formatCurrency(bike.pricePerDay)}</span>
                <span className="text-gray-500">/ day</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-heading font-semibold text-white mb-3">About this vehicle</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {bike.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Link href={`/booking?bike=${bike.slug}`} className="flex-1">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg py-6"
                  disabled={(bike.availableUnits || 0) === 0}
                >
                  Book This Bike
                </Button>
              </Link>
              <a href={`https://wa.me/${WHATSAPP_NUMBER?.replace(/[^0-9]/g, '')}?text=Hi! I am interested in renting the ${bike.name}.`} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-6"
                >
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.098.824z"/></svg>
                  Inquire on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Specs Section */}
        <div className="mb-16">
          <BikeSpecs bike={bike} />
        </div>

        {/* Rental Terms (Hardcoded for demo) */}
        <div className="mb-16 bg-[#111827] rounded-3xl p-8 border border-gray-700/50">
           <h3 className="text-xl font-heading font-semibold text-white mb-6">Rental Terms & Conditions</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
              <ul className="space-y-3 list-disc list-inside">
                <li>Valid driving license is mandatory for all rentals.</li>
                <li>Original ID proof (Aadhar/Passport) must be submitted at pickup.</li>
                <li>Refundable security deposit is required (amount varies by vehicle).</li>
              </ul>
              <ul className="space-y-3 list-disc list-inside">
                <li>Fuel is not included in the rental price.</li>
                <li>Vehicle must be returned at the agreed time to avoid late fees.</li>
                <li>Speed limit of 80km/hr applies to all vehicles.</li>
              </ul>
           </div>
        </div>

        {/* Related Bikes */}
        <RelatedBikes currentSlug={bike.slug} bikes={relatedBikes} />
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": bike.name,
            "image": bike.images[0],
            "description": bike.description,
            "brand": {
              "@type": "Brand",
              "name": bike.brand
            },
            "offers": {
              "@type": "Offer",
              "url": `https://singhjibikerental.com/bikes/${bike.slug}`,
              "priceCurrency": "INR",
              "price": bike.pricePerDay,
              "availability": (bike.availableUnits || 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            }
          })
        }}
      />
    </main>
  );
}
