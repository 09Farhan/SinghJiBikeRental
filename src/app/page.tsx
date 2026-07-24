import HeroSection from '@/components/home/HeroSection';
import FeaturedBikes from '@/components/home/FeaturedBikes';
import BenefitsSection from '@/components/home/BenefitsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import { Metadata } from 'next';
import { FAQS as faqs } from '@/lib/constants';

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Singh Ji's Bike Rental | Premium Bike & Scooter Rentals in India",
  description: "Rent premium bikes and scooters for your next adventure. Self-drive bike rental with doorstep delivery. BMW, Royal Enfield, KTM & more starting ₹600/day.",
  keywords: "bike rental, scooter rental, rent a bike, self drive bikes, premium bike rental India, Royal Enfield rental, KTM rental",
  openGraph: {
    title: "Singh Ji's Bike Rental | Premium Bike & Scooter Rentals",
    description: "Rent premium bikes and scooters for your next adventure. Self-drive bike rental with doorstep delivery.",
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

  return (
    <main className="flex min-h-screen flex-col bg-[#0a0e1a]">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <HeroSection />
      <FeaturedBikes />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
