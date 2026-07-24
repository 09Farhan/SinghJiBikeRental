import Link from 'next/link';
import { PHONE_NUMBER } from '@/lib/constants';

export default function CTASection() {
  return (
    <section className="w-full py-24 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-orange-500/10 border-y border-orange-500/20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
          Ready for Your Next Adventure?
        </h2>
        
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
          Book your ride in under 2 minutes. No hidden charges, no hassle.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
          <Link 
            href="/bikes"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium text-lg hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/25 w-full sm:w-auto text-center"
          >
            Book a Bike Now
          </Link>
          <a 
            href={`tel:${PHONE_NUMBER || '+919876543210'}`}
            className="px-8 py-4 rounded-xl border border-orange-500/50 text-white font-medium text-lg hover:bg-orange-500/10 transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Us: {PHONE_NUMBER || '+91 98765 43210'}
          </a>
        </div>
        
        <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Trusted by 500+ riders across India
        </p>
      </div>
    </section>
  );
}
