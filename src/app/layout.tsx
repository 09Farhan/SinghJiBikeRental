import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import DelayedPopup from '@/components/ui/DelayedPopup'
import { BUSINESS_ADDRESS, PHONE_NUMBER } from '@/lib/constants'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Singh Ji\'s Bike Rentals | Bike Rentals in Siliguri',
    template: '%s | Singh Ji\'s Bike Rentals',
  },
  description: 'Looking for a bike rental in Siliguri? Singh Ji\'s Bike Rentals offers premium motorcycles and scooters on rent for local travel and Darjeeling/Sikkim trips. Book online!',
  keywords: ['bike rental in Siliguri', 'bike rental Siliguri', 'scooter rental Siliguri', 'bike rent in Siliguri', 'bike on rent in Siliguri', 'rent a bike in Siliguri', 'motorcycle rental Siliguri'],
  openGraph: {
    locale: 'en_IN',
    type: 'website',
    siteName: 'Singh Ji\'s Bike Rentals',
    title: 'Singh Ji\'s Bike Rentals | Bike Rentals in Siliguri',
    description: 'Looking for a bike rental in Siliguri? Singh Ji\'s Bike Rentals offers premium motorcycles and scooters on rent for local travel and Darjeeling/Sikkim trips.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singh Ji\'s Bike Rentals | Bike Rentals in Siliguri',
    description: 'Looking for a bike rental in Siliguri? Singh Ji\'s Bike Rentals offers premium motorcycles and scooters on rent for local travel and Darjeeling/Sikkim trips.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutoRental'],
    name: 'Singh Ji\'s Bike Rentals',
    image: 'https://www.singhjibikerental.com/logo.png',
    '@id': 'https://www.singhjibikerental.com',
    url: 'https://www.singhjibikerental.com',
    telephone: PHONE_NUMBER,
    priceRange: '₹600 - ₹3000',
    openingHours: 'Mo-Su 07:00-21:00',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_ADDRESS,
      addressLocality: 'Siliguri',
      addressRegion: 'West Bengal',
      postalCode: '734001',
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'City', name: 'Siliguri' },
      { '@type': 'City', name: 'Darjeeling' },
      { '@type': 'City', name: 'Sikkim' },
      { '@type': 'Place', name: 'Bagdogra Airport' },
      { '@type': 'Place', name: 'New Jalpaiguri Railway Station (NJP)' }
    ]
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[#0a0e1a] text-white font-body">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
        <DelayedPopup />
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' } }} />
      </body>
    </html>
  )
}
