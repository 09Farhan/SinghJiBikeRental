import React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glassmorphism?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = true, glassmorphism = false, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'rounded-2xl border transition-all duration-300',
          glassmorphism
            ? 'bg-white/5 backdrop-blur-sm border-white/10'
            : 'bg-[#111827] border-gray-700/50',
          hover && !glassmorphism && 'hover:bg-[#1f2937] hover:border-gray-600/50 hover:shadow-xl hover:shadow-orange-500/5 hover:scale-[1.01]',
          hover && glassmorphism && 'hover:bg-white/10 hover:shadow-xl hover:shadow-orange-500/5 hover:scale-[1.01]',
          onClick && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
