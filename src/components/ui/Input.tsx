'use client'

import React, { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  type?: string
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, label, error, icon, type = 'text', ...props }, ref) => {
    const isTextarea = type === 'textarea'
    const Component = isTextarea ? 'textarea' : 'input'

    return (
      <div className="w-full flex flex-col">
        {label && (
          <label className="text-sm font-medium text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <Component
            // @ts-ignore
            ref={ref}
            type={isTextarea ? undefined : type}
            className={cn(
              'bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 w-full',
              icon ? 'pl-11' : undefined,
              isTextarea && 'min-h-[100px] resize-y',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
              className
            )}
            {...(props as any)}
          />
        </div>
        {error && <span className="text-red-400 text-sm mt-1">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
