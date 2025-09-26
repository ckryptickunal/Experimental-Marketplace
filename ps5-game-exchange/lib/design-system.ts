// Design System following Apple HIG and trust-building principles

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
} as const

export const typography = {
  // Display
  display: 'text-5xl md:text-6xl font-bold tracking-tight',
  // Headlines
  h1: 'text-3xl md:text-4xl font-semibold tracking-tight',
  h2: 'text-2xl md:text-3xl font-semibold tracking-tight',
  h3: 'text-xl md:text-2xl font-semibold',
  h4: 'text-lg md:text-xl font-semibold',
  // Body
  bodyLarge: 'text-base md:text-lg',
  body: 'text-sm md:text-base',
  bodySmall: 'text-xs md:text-sm',
  // Labels
  label: 'text-sm font-medium',
  caption: 'text-xs text-muted-foreground',
} as const

export const trustIndicators = {
  verified: {
    icon: '✓',
    label: 'Verified Seller',
    color: 'text-green-600 bg-green-50',
  },
  secure: {
    icon: '🔒',
    label: 'Secure Transaction',
    color: 'text-blue-600 bg-blue-50',
  },
  guarantee: {
    icon: '🛡️',
    label: 'Buyer Protection',
    color: 'text-indigo-600 bg-indigo-50',
  },
  responsive: {
    icon: '⚡',
    label: 'Quick Response',
    color: 'text-amber-600 bg-amber-50',
  },
} as const

export const animations = {
  fadeIn: 'animate-in fade-in duration-500',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-500',
  slideDown: 'animate-in slide-in-from-top-4 duration-500',
  scaleIn: 'animate-in zoom-in-95 duration-300',
  hover: 'transition-all duration-200 hover:scale-[1.02] hover:shadow-lg',
  press: 'active:scale-[0.98] transition-transform duration-150',
} as const

export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  inner: 'shadow-inner',
  glow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
  trustGlow: 'shadow-[0_0_20px_rgba(34,197,94,0.2)]',
} as const