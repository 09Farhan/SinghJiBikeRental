import { Metadata } from 'next';
import FAQSection from '@/components/home/FAQSection';
import { FAQS as faqs } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about bike rentals, documents required, security deposits, and booking procedures at Singh Ji\'s Bike Rentals in Siliguri.',
  openGraph: {
    title: 'FAQ - Singh Ji\'s Bike Rentals',
    description: 'Find answers to common questions about bike rentals, documents required, security deposits, and booking procedures.',
  }
};

export default function FAQPage() {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="pt-24 pb-12 bg-[#0a0e1a] min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
          <nav className="text-sm mb-4 text-gray-400">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <a href="/" className="hover:text-amber-500 transition-colors">Home</a>
                <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li className="flex items-center">
                <span className="text-white">FAQs</span>
              </li>
            </ol>
          </nav>
        </div>
        
        <FAQSection />
      </div>
    </>
  );
}
