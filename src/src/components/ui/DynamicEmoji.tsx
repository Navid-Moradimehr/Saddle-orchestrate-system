'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type DynamicEmojiVariant = 'bulb' | 'robot' | 'gear' | 'rocket' | 'hand' | 'sparkles';
type Props = { variant: DynamicEmojiVariant; size?: number; label?: string };

export default function DynamicEmoji({ variant, size = 64, label }: Props) {
  const reducedMotion = useReducedMotion();
  const motionProps = reducedMotion
    ? undefined
    : variant === 'bulb'
      ? { rotate: [-5, 5, -5] }
      : variant === 'gear'
        ? { rotate: 360 }
        : variant === 'rocket'
          ? { y: [0, -8, 0] }
          : variant === 'hand'
            ? { rotate: [-8, 8, -8] }
            : { scale: [1, 1.08, 1] };
  const transition = variant === 'gear'
    ? { duration: 8, repeat: Infinity, ease: 'linear' as const }
    : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      animate={motionProps}
      transition={transition}
      className="overflow-visible text-orange"
    >
      {variant === 'bulb' && <>
        <path d="M22 28a10 10 0 1 1 20 0c0 4-2 6-5 9H27c-3-3-5-5-5-9Z" fill="currentColor" opacity=".2" stroke="currentColor" strokeWidth="2" />
        <path d="M28 40h8m-7 4h6M32 8v5m-17 2 4 4m25-4-4 4M9 29h6m34 0h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>}
      {variant === 'robot' && <>
        <rect x="15" y="17" width="34" height="28" rx="9" fill="currentColor" opacity=".18" stroke="currentColor" strokeWidth="2" />
        <rect x="20" y="23" width="24" height="13" rx="5" fill="currentColor" />
        <circle cx="27" cy="29" r="2" fill="var(--color-cream)" /><circle cx="37" cy="29" r="2" fill="var(--color-cream)" />
        <path d="M32 17V10m0 0-3 3m3-3 3 3M10 26h5m34 0h5M23 50h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>}
      {variant === 'gear' && <>
        <path d="m32 10 3 5a18 18 0 0 1 5 2l5-2 4 6-4 4a18 18 0 0 1 1 6l5 3-3 7-6-1a18 18 0 0 1-5 4v6h-8v-6a18 18 0 0 1-5-4l-6 1-3-7 5-3a18 18 0 0 1 1-6l-4-4 4-6 5 2a18 18 0 0 1 5-2l3-5Z" fill="currentColor" opacity=".16" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="32" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      </>}
      {variant === 'rocket' && <>
        <path d="M36 11c8 4 12 12 11 21L36 43l-8-3-3-8 11-11c0-4 0-7 0-10Z" fill="currentColor" opacity=".2" stroke="currentColor" strokeWidth="2" />
        <circle cx="38" cy="24" r="3" fill="currentColor" /><path d="m27 34-7 2-3 7 8-3 5-6m-4 9-4 5m-2-15-5-3m-2 12-4 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>}
      {variant === 'hand' && <>
        <path d="M26 49c-5-2-7-7-6-13l1-13c0-2 3-2 3 0l1 8V15c0-2 3-2 3 0v14-17c0-2 3-2 3 0v17-15c0-2 3-2 3 0v16l2-10c0-2 3-2 3 0v15c0 7-4 13-10 14Z" fill="currentColor" opacity=".18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </>}
      {variant === 'sparkles' && <>
        <path d="m32 8 3 16 16 3-16 3-3 18-3-18-16-3 16-3 3-16Zm20 32 2 7 6 2-6 2-2 7-2-7-6-2 6-2 2-7Z" fill="currentColor" opacity=".75" />
      </>}
    </motion.svg>
  );
}
