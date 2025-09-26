import React from 'react'
import { cn } from '@/lib/utils'
import { trustIndicators } from '@/lib/design-system'

interface TrustBadgeProps {
  type: keyof typeof trustIndicators
  className?: string
  showLabel?: boolean
}

export function TrustBadge({ type, className, showLabel = true }: TrustBadgeProps) {
  const indicator = trustIndicators[type]
  
  return (
    <div className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
      indicator.color,
      'border border-current/20',
      className
    )}>
      <span className="text-base" aria-hidden="true">{indicator.icon}</span>
      {showLabel && <span>{indicator.label}</span>}
    </div>
  )
}