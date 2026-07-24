'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ADMIN_NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 flex-shrink-0 h-screen bg-[#111827] border-r border-gray-800 flex flex-col z-40">
      {/* Logo and Close Button */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-800">
        <Link href="/admin" onClick={onClose} className="text-orange-500 font-heading font-bold text-xl">
          Singh Ji's Admin
        </Link>
        <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2">
        {ADMIN_NAV_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
          
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                isActive 
                  ? 'bg-orange-500/10 text-orange-500 border-r-2 border-orange-500' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <span className="font-medium text-sm">{link.name}</span>
            </Link>
          )
        })}

        <div className="my-4 border-t border-gray-800" />
        
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <span className="w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </span>
          <span className="font-medium text-sm">Back to Site</span>
        </Link>
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  )
}
