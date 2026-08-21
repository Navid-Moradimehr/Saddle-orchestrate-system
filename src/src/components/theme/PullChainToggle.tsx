'use client';
import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Sun, Moon } from 'lucide-react';

export default function PullChainToggle() {
  const { theme, setTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [isPulling, setIsPulling] = useState(false);
  const [bulbShake, setBulbShake] = useState(false);
  const [flicker, setFlicker] = useState(false);
  const chainRef = useRef<HTMLDivElement>(null);
  const lampOn = theme === 'light';

  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const chainLength = useTransform(springY, [0, 60], [24, 84]);
  const bulbRotate = useTransform(springY, [0, 40], [0, 8]);
  const bulbScale = useTransform(springY, [0, 30], [1, 1.05]);

  const handlePointerDown = useCallback(() => {
    if (reducedMotion) return;
    setIsPulling(true);
  }, [reducedMotion]);

  const handlePointerMove = useCallback((e: React.PointerEvent | PointerEvent) => {
    if (!isPulling || reducedMotion) return;
    const chain = chainRef.current;
    if (!chain) return;
    const rect = chain.getBoundingClientRect();
    const dy = e.clientY - (rect.top + rect.height / 2);
    y.set(Math.max(0, Math.min(70, dy)));
  }, [isPulling, reducedMotion, y]);

  const handlePointerUp = useCallback((e?: React.PointerEvent) => {
    if (reducedMotion) return;
    if (e?.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    setIsPulling(false);
    const currentY = y.get();
    if (currentY > 30) {
      // Toggle theme
      setFlicker(true);
      setBulbShake(true);
      setTimeout(() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }, 200);
      setTimeout(() => setFlicker(false), 500);
      setTimeout(() => setBulbShake(false), 600);
    }
    y.set(0);
  }, [reducedMotion, y, theme, setTheme]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlicker(true);
      setBulbShake(true);
      setTimeout(() => setTheme(theme === 'light' ? 'dark' : 'light'), 200);
      setTimeout(() => setFlicker(false), 500);
      setTimeout(() => setBulbShake(false), 600);
    }
  }, [theme, setTheme]);

  // Accessibility button for keyboard/screen readers
  const handleAccessibleToggle = useCallback(() => {
    setFlicker(true);
    setBulbShake(true);
    setTimeout(() => setTheme(theme === 'light' ? 'dark' : 'light'), 200);
    setTimeout(() => setFlicker(false), 500);
    setTimeout(() => setBulbShake(false), 600);
  }, [theme, setTheme]);

  return (
    <>
      {/* Accessible theme toggle button (for keyboard & screen readers) */}
      <button
        onClick={handleAccessibleToggle}
        className="fixed right-5 top-[4.75rem] z-[60] rounded-full border border-border bg-cream-dark p-2.5 shadow-sm transition-[box-shadow,background-color,transform] duration-180 hover:shadow-md active:scale-95 dark:border-border-dark dark:bg-charcoal-light sm:right-6"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-orange" />}
      </button>

      {/* Pull-chain assembly */}
      <div className="fixed right-[4.75rem] top-[4.75rem] z-[55] flex flex-col items-center" role="region" aria-label="Theme pull chain">
        {/* Bulb / Lamp */}
        <motion.div
          className={`relative w-8 h-10 ${flicker ? 'animate-pulse' : ''}`}
          style={{ rotate: bulbRotate, scale: bulbScale }}
        >
          <svg viewBox="0 0 32 40" className="w-full h-full" aria-hidden="true">
            {/* Bulb glass */}
            <path
              d="M10 28 Q8 20 10 14 Q12 8 16 6 Q20 8 22 14 Q24 20 22 28 Z"
              fill={lampOn ? '#F48120' : '#374151'}
              stroke={lampOn ? '#F48120' : '#9CA3AF'}
              strokeWidth="1.5"
              className="transition-[fill,stroke,opacity] duration-500"
              opacity={lampOn ? 0.95 : 0.75}
            />
            {/* Base */}
            <rect x="11" y="28" width="10" height="4" rx="1" fill={lampOn ? '#D6701A' : '#6B7280'} className="transition-colors duration-500" />
            <rect x="13" y="32" width="6" height="3" rx="1" fill={lampOn ? '#D6701A' : '#6B7280'} className="transition-colors duration-500" />
            {/* Glow */}
            {lampOn && (
              <circle cx="16" cy="16" r="18" fill="none" className="stroke-orange" strokeWidth="0.5" opacity="0.3">
                <animate attributeName="r" values="16;22;16" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Filament */}
            {lampOn && (
              <path
                d="M13 14 Q16 10 19 14"
                fill="none"
                className="stroke-orange"
                strokeWidth="1"
                opacity="0.7"
              />
            )}
          </svg>
        </motion.div>

        {/* Chain */}
        <motion.div
          ref={chainRef}
          className="relative cursor-pointer touch-none select-none"
          style={{ height: chainLength }}
          onPointerDown={(e) => { handlePointerDown(); e.currentTarget.setPointerCapture(e.pointerId); }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          role="button"
          tabIndex={0}
          aria-label="Pull to toggle theme"
          onKeyDown={handleKeyDown}
        >
          {/* Chain links */}
          <svg
            viewBox="0 0 12 80"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3"
            style={{ height: '100%' }}
            aria-hidden="true"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <ellipse
                key={i}
                cx="6"
                cy={i * 8 + 4}
                rx="4"
                ry="3"
                fill="none"
                stroke={lampOn ? '#D6A15D' : '#6B7280'}
                strokeWidth="1"
                className="transition-colors duration-500"
              />
            ))}
          </svg>

          {/* Pull handle */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-orange shadow-glow-orange"
            animate={isPulling ? { scale: 1.1 } : { scale: 1 }}
          />
        </motion.div>
      </div>

      {/* Flicker overlay for transition */}
      <AnimatePresence>
        {flicker && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.1, 0.4, 0.2, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-full bg-orange/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
