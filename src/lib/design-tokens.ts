export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

export const colors = {
  cream: '#FAF7F2',
  creamDark: '#F0EBE3',
  charcoal: '#1A1A1A',
  charcoalLight: '#2A2A2A',
  charcoalLighter: '#3A3A3A',
  orange: '#F48120',
  orangeLight: '#FFA94D',
  orangeDark: '#D6701A',
  orangeGlow: 'rgba(244,129,32,0.4)',
  blue: '#3B82F6',
  blueGlow: 'rgba(59,130,246,0.3)',
  green: '#22C55E',
  greenGlow: 'rgba(34,197,94,0.3)',
} as const;

export const radius = {
  sm: '0.375rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  full: '9999px',
} as const;

export const shadows = {
  card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
  cardHover: '0 2px 6px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)',
  glowOrange: '0 0 30px rgba(244,129,32,0.25)',
  glowBlue: '0 0 30px rgba(59,130,246,0.2)',
} as const;

export const sectionWidth = 'max-w-[1280px]';
