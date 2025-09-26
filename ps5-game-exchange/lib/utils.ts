import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 7)
  return `PS5-${timestamp}-${randomStr}`.toUpperCase()
}

export function getConditionLabel(condition: string): string {
  const labels: Record<string, string> = {
    NEW: 'Brand New',
    LIKE_NEW: 'Like New',
    VERY_GOOD: 'Very Good',
    GOOD: 'Good',
    ACCEPTABLE: 'Acceptable'
  }
  return labels[condition] || condition
}

export function getConditionColor(condition: string): string {
  const colors: Record<string, string> = {
    NEW: 'bg-green-100 text-green-800',
    LIKE_NEW: 'bg-blue-100 text-blue-800',
    VERY_GOOD: 'bg-indigo-100 text-indigo-800',
    GOOD: 'bg-yellow-100 text-yellow-800',
    ACCEPTABLE: 'bg-gray-100 text-gray-800'
  }
  return colors[condition] || 'bg-gray-100 text-gray-800'
}