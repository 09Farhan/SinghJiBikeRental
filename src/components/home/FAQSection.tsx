'use client';

import { useState } from 'react';

import { FAQS as faqs } from '@/lib/constants';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-[#0a0e1a]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-gray-800"
            >
              <button
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none group"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`font-medium text-lg transition-colors ${openIndex === index ? 'text-orange-400' : 'text-white group-hover:text-orange-400'}`}>
                  {faq.q}
                </span>
                <span className="ml-4 flex-shrink-0">
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-orange-400' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="pb-6 text-gray-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
