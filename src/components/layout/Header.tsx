'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-[#0a0e1a]/90 backdrop-blur-xl shadow-neu py-3' : 'bg-transparent py-5',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
      >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 z-50">
          <span className="text-amber-500 font-heading font-bold text-2xl">Singh Ji's</span>
          <span className="text-gray-300 font-heading font-medium text-xl">Bike Rentals</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-white',
                  isActive ? 'text-amber-500' : 'text-gray-300'
                )}
              >
                {link.name}
              </Link>
            )
          })}
          <Link href="/bikes" tabIndex={-1}>
            <Button size="sm">Book Now</Button>
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden z-50 p-2 text-gray-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={cn('w-full h-0.5 bg-current transition-all duration-300', isMobileMenuOpen && 'rotate-45 translate-y-2')} />
            <span className={cn('w-full h-0.5 bg-current transition-all duration-300', isMobileMenuOpen && 'opacity-0')} />
            <span className={cn('w-full h-0.5 bg-current transition-all duration-300', isMobileMenuOpen && '-rotate-45 -translate-y-2.5')} />
          </div>
        </button>
      </div>

      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-[#0a0e1a] z-40 md:hidden transition-transform duration-300 ease-in-out flex flex-col pt-24 px-6',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-2xl font-heading font-medium transition-colors',
                  isActive ? 'text-amber-500' : 'text-gray-300'
                )}
              >
                {link.name}
              </Link>
            )
          })}
          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link href="/bikes" tabIndex={-1} className="block w-full">
              <Button fullWidth size="lg">Book Now</Button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
