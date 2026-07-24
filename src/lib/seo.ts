import type { Bike } from '@prisma/client';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, BUSINESS_ADDRESS, PHONE_NUMBER } from './constants';

export function getBaseMetadata() {
  return {
    title: {
      template: `%s | ${SITE_NAME}`,
      default: SITE_NAME,
    },
    description: SITE_DESCRIPTION,
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: SITE_URL,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
  };
}

export function getBikeMetadata(bike: Bike) {
  return {
    title: `${bike.name} on Rent`,
    description: `Rent the ${bike.name} by ${bike.brand} for ₹${bike.pricePerDay}/day. ${bike.description.substring(0, 100)}...`,
    openGraph: {
      title: `${bike.name} on Rent | ${SITE_NAME}`,
      description: `Rent the ${bike.name} by ${bike.brand} for ₹${bike.pricePerDay}/day.`,
      images: [
        {
          url: bike.images[0] || '',
          width: 800,
          height: 600,
          alt: bike.name,
        },
      ],
    },
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": SITE_NAME,
    "image": `${SITE_URL}/logo.png`,
    "@id": SITE_URL,
    "url": SITE_URL,
    "telephone": PHONE_NUMBER,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_ADDRESS,
      "addressLocality": "Bangalore",
      "addressRegion": "KA",
      "postalCode": "560001",
      "addressCountry": "IN"
    }
  };
}

export function getBikeProductSchema(bike: Bike) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": bike.name,
    "image": bike.images,
    "description": bike.description,
    "brand": {
      "@type": "Brand",
      "name": bike.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/bikes/${bike.slug}`,
      "priceCurrency": "INR",
      "price": bike.pricePerDay,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": SITE_NAME
      }
    }
  };
}

export function getFAQSchema(faqs: {q: string, a: string}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}
