import React from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'card' | 'image'
}

export default function Skeleton({
  className,
  variant = 'text',
  ...props
}: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded-md',
    card: 'h-64 w-full rounded-2xl',
    image: 'h-48 w-full rounded-2xl',
  }

  return (
    <div
      className={cn('animate-pulse bg-gray-700/50', variants[variant], className)}
      {...props}
    />
  )
}
