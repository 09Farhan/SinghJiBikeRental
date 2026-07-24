import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BikeGallery from '@/components/bikes/BikeGallery';
import BikeSpecs from '@/components/bikes/BikeSpecs';
import RelatedBikes from '@/components/bikes/RelatedBikes';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

const DEMO_BIKES = [
  { id: '1', name: 'BMW G 310 GS', slug: 'bmw-g310-gs', brand: 'BMW', category: 'BIKE', pricePerDay: 2000, engine: '313cc Single Cylinder', mileage: '30 kmpl', fuelType: 'PETROL', transmission: 'MANUAL', seatCapacity: 2, description: 'The BMW G 310 GS is an adventure-ready motorcycle that brings the GS promise to the sub-500cc segment. It is designed for everyday adventures and long rides.', images: ['/images/bikes/bmw-g310-gs-1.jpg'], isActive: true, availableUnits: 2 },
  { id: '2', name: 'Royal Enfield Classic 350', slug: 'royal-enfield-classic-350', brand: 'Royal Enfield', category: 'BIKE', pricePerDay: 1000, engine: '349cc Single Cylinder', mileage: '35 kmpl', fuelType: 'PETROL', transmission: 'MANUAL', seatCapacity: 2, description: 'The timeless Classic 350 continues to hold its appeal with its retro styling and thumping engine. A perfect companion for city rides and highway cruising.', images: ['/images/bikes/royal-enfield-classic-350-1.jpg'], isActive: true, availableUnits: 3 },
  { id: '3', name: 'Royal Enfield Himalayan', slug: 'royal-enfield-himalayan', brand: 'Royal Enfield', category: 'BIKE', pricePerDay: 1500, engine: '411cc Single Cylinder', mileage: '30 kmpl', fuelType: 'PETROL', transmission: 'MANUAL', seatCapacity: 2, description: 'Built for all roads and no roads. The Himalayan is your true adventure companion with exceptional ground clearance and rugged build.', images: ['/images/bikes/royal-enfield-himalayan-1.jpg'], isActive: true, availableUnits: 2 },
  { id: '4', name: 'KTM Duke 390', slug: 'ktm-duke-390', brand: 'KTM', category: 'BIKE', pricePerDay: 1800, engine: '373cc Single Cylinder', mileage: '25 kmpl', fuelType: 'PETROL', transmission: 'MANUAL', seatCapacity: 2, description: 'The corner rocket. KTM Duke 390 offers thrilling performance with its lightweight chassis and powerful engine.', images: ['/images/bikes/ktm-duke-390-1.jpg'], isActive: true, availableUnits: 1 },
  { id: '5', name: 'TVS Apache RTR 160', slug: 'tvs-apache-rtr-160', brand: 'TVS', category: 'BIKE', pricePerDay: 800, engine: '159.7cc Single Cylinder', mileage: '45 kmpl', fuelType: 'PETROL', transmission: 'MANUAL', seatCapacity: 2, description: 'A perfect blend of everyday practicality and sporty performance. The Apache RTR 160 is great for city commuting.', images: ['/images/bikes/tvs-apache-rtr-160-1.jpg'], isActive: true, availableUnits: 2 },
  { id: '6', name: 'Honda Activa 6G', slug: 'honda-activa-6g', brand: 'Honda', category: 'SCOOTER', pricePerDay: 400, engine: '109.51cc Single Cylinder', mileage: '60 kmpl', fuelType: 'PETROL', transmission: 'AUTOMATIC', seatCapacity: 2, description: 'India\'s most trusted scooter. The Activa 6G offers smooth performance, great mileage, and ultimate reliability.', images: ['/images/bikes/honda-activa-6g-1.jpg'], isActive: true, availableUnits: 3 },
  { id: '7', name: 'Suzuki Access 125', slug: 'suzuki-access-125', brand: 'Suzuki', category: 'SCOOTER', pricePerDay: 450, engine: '124cc Single Cylinder', mileage: '55 kmpl', fuelType: 'PETROL', transmission: 'AUTOMATIC', seatCapacity: 2, description: 'A premium scooter that delivers peppy performance without compromising on fuel efficiency and comfort.', images: ['/images/bikes/suzuki-access-125-1.jpg'], isActive: true, availableUnits: 2 },
  { id: '8', name: 'Yamaha Aerox 155', slug: 'yamaha-aerox-155', brand: 'Yamaha', category: 'SCOOTER', pricePerDay: 600, engine: '155cc Single Cylinder', mileage: '40 kmpl', fuelType: 'PETROL', transmission: 'AUTOMATIC', seatCapacity: 2, description: 'A maxi-sports scooter that shares its DNA with the R15. Extremely fun to ride with sharp handling.', images: ['/images/bikes/yamaha-aerox-155-1.jpg'], isActive: true, availableUnits: 1 }
];

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const bike = DEMO_BIKES.find(b => b.slug === params.slug);
  
  if (!bike) {
    return { title: 'Bike Not Found' };
  }

  return {
    title: `${bike.name} - Rent at ₹${bike.pricePerDay}/day`,
    description: bike.description,
  };
}

export default function BikeDetailPage({ params }: { params: { slug: string } }) {
  const bike = DEMO_BIKES.find(b => b.slug === params.slug);

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
              <Badge variant={bike.availableUnits > 0 ? "success" : "danger"}>
                {bike.availableUnits > 0 ? `${bike.availableUnits} Available` : 'Sold Out'}
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
                  disabled={bike.availableUnits === 0}
                >
                  Book This Bike
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-6"
              >
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.098.824z"/></svg>
                Inquire on WhatsApp
              </Button>
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
        <RelatedBikes currentSlug={bike.slug} bikes={DEMO_BIKES} />
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
              "availability": bike.availableUnits > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            }
          })
        }}
      />
    </main>
  );
}
