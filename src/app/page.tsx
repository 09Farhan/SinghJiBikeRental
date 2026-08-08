import HeroSection from '@/components/home/HeroSection';
import SearchWidget from '@/components/home/SearchWidget';
import FeaturedBikes from '@/components/home/FeaturedBikes';
import BenefitsSection from '@/components/home/BenefitsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import { Metadata } from 'next';
import { FAQS as faqs } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Singh Ji's Bike Rental | Bike Rental in Siliguri",
  description: "Looking for a bike rental in Siliguri? Singh Ji's Bike Rental offers premium motorcycles and scooters on rent for local travel and Darjeeling/Sikkim trips. Book online!",
  keywords: "bike rental Siliguri, scooter rental Siliguri, rent a bike in Siliguri, bike rent in Siliguri, two wheeler rental Siliguri, bike rental near NJP, bike rental Bagdogra",
  openGraph: {
    title: "Singh Ji's Bike Rental | Bike Rental in Siliguri",
    description: "Looking for a bike rental in Siliguri? Singh Ji's Bike Rental offers premium motorcycles and scooters on rent for local travel and Darjeeling/Sikkim trips.",
    url: 'https://singhjibikes.com',
    siteName: "Singh Ji's Bike Rental",
    locale: 'en_IN',
    type: 'website',
  },
};

export default function HomePage() {
  // Generate JSON-LD schema for FAQ
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  const rentalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Vehicle Rental',
    provider: {
      '@type': 'LocalBusiness',
      name: "Singh Ji's Bike Rental",
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Siliguri',
        addressRegion: 'West Bengal',
        addressCountry: 'IN'
      }
    },
    areaServed: {
      '@type': 'City',
      name: 'Siliguri'
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#0a0e1a]">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rentalServiceSchema) }}
      />
      
      <HeroSection />
      <SearchWidget />
      <FeaturedBikes />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
