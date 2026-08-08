'use client'

import React, { useState, useEffect } from 'react'
import { WHATSAPP_NUMBER, PHONE_NUMBER } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex flex-col gap-4 transition-all duration-500',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      )}
    >
      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20 text-black hover:scale-110 transition-transform duration-300 group relative focus:outline-none"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span className="absolute right-full mr-4 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none">
          Back to Top
        </span>
      </button>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER?.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 text-white hover:scale-110 transition-transform duration-300 group relative"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.373-.043c.098-.115.427-.506.541-.681.114-.175.231-.151.39-.087.159.065 1.004.474 1.177.561.173.087.289.13.332.202.043.073.043.423-.101.827z" />
        </svg>
        <span className="absolute right-full mr-4 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      {/* Phone */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="w-14 h-14 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20 text-white hover:scale-110 transition-transform duration-300 group relative"
        aria-label="Call Us"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="absolute right-full mr-4 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Call Us
        </span>
      </a>
    </div>
  )
}
