'use client';

import { motion } from 'framer-motion';
import DynamicEmoji from '@/components/ui/DynamicEmoji';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const principles = [
  ['Start with context', 'A model is only useful when it understands the operating conditions around a decision'],
  ['Design the whole loop', 'Data, tools, memory, agents, and interfaces should reinforce one another'],
  ['Make every decision traceable', 'From the first event and model gradient to the final customer outcome, important changes should be inspectable'],
] as const;

export default function AboutSection() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="about" className="border-y border-border px-6 py-24 dark:border-border-dark md:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-orange">How we work</p>
            <h2 id="about-heading" className="mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Human enough to care. Systematic enough to ship</h2>
            <div className="mt-8 flex items-center gap-4">
              <DynamicEmoji variant="hand" size={48} label="Waving hand" />
              <p className="max-w-sm text-sm leading-6 text-text-secondary">We are a product design and industrial intelligence studio for teams turning complex operations into clear, usable systems</p>
            </div>
          </div>
          <div className="grid gap-4">
            {principles.map(([title, body], index) => (
              <motion.article key={title} initial={reducedMotion ? false : { opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .4 }} transition={reducedMotion ? { duration: 0 } : { delay: index * .24, duration: .55, ease: [0.23, 1, 0.32, 1] }} className="rounded-2xl border border-border p-5 dark:border-border-dark">
                <span className="font-mono text-xs text-orange">0{index + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-text-secondary">{body}</p>
              </motion.article>
            ))}
            <div className="mt-2 flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-cream-dark/60 p-4 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:border-border-dark dark:bg-charcoal-light/40">
              <span>site</span><span className="text-orange">→</span><span>stream</span><span className="text-orange">→</span><span>model</span><span className="text-orange">→</span><span>agent</span><span className="text-orange">→</span><span>operation</span><span className="text-orange">→</span><span>customer</span><span className="text-orange">→</span><span>feedback</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
