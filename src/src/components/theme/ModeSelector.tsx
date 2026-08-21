'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme, type VisualMode } from '@/lib/theme-context';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const modes: Array<{ value: VisualMode; label: string; note: string }> = [
  { value: 'human', label: 'Human', note: 'Warm + organic' },
  { value: 'system', label: 'System', note: 'Clear + technical' },
  { value: 'combined', label: 'Combined', note: 'Warm + precise' },
];

export default function ModeSelector() {
  const { visualMode, setVisualMode } = useTheme();
  const reducedMotion = useReducedMotion();
  const [keyboardNav, setKeyboardNav] = useState(false);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectWithFocus = (index: number) => {
    const next = modes[(index + modes.length) % modes.length].value;
    setVisualMode(next);
    buttonRefs.current[(index + modes.length) % modes.length]?.focus();
  };

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-12 md:py-16" aria-labelledby="mode-heading">
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-white/50 p-5 shadow-card dark:border-border-dark dark:bg-charcoal-light/50 md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange">Choose your lens</p>
          <h2 id="mode-heading" className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">How should the work feel?</h2>
        </div>
        <div className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-cream-dark/60 p-1 dark:border-border-dark dark:bg-charcoal" role="radiogroup" aria-label="Visual presentation mode">
          {modes.map((mode, index) => {
            const selected = visualMode === mode.value;
            return (
              <button
                key={mode.value}
                type="button"
                role="radio"
                aria-checked={selected}
                tabIndex={selected ? 0 : -1}
                ref={(element) => { buttonRefs.current[index] = element; }}
                onClick={() => { setKeyboardNav(false); setVisualMode(mode.value); }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    setKeyboardNav(true);
                    selectWithFocus(index + 1);
                  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    setKeyboardNav(true);
                    selectWithFocus(index - 1);
                  } else if (event.key === 'Home') {
                    event.preventDefault();
                    setKeyboardNav(true);
                    selectWithFocus(0);
                  } else if (event.key === 'End') {
                    event.preventDefault();
                    setKeyboardNav(true);
                    selectWithFocus(modes.length - 1);
                  }
                }}
                className={`relative min-w-[92px] rounded-lg px-3 py-2 text-left transition-colors focus-visible:outline-orange md:min-w-[120px] ${selected ? 'text-white' : 'text-text-secondary hover:text-text-primary'}`}
              >
                {selected && (
                  <motion.span
                    layoutId="mode-pill"
                    className="absolute inset-0 rounded-lg bg-orange shadow-glow-orange"
                    transition={reducedMotion || keyboardNav ? { duration: 0 } : { type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 block text-sm font-semibold">{mode.label}</span>
                <span className={`relative z-10 hidden text-[10px] md:block ${selected ? 'text-white' : 'text-text-muted'}`}>{mode.note}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
