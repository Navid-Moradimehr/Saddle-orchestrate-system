'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp } from '@/lib/motion';

export default function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="intro" className="py-section-md md:py-section px-6">
      <motion.div
        ref={ref}
        className="max-w-[1280px] mx-auto text-center"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
      >
        <span className="text-sm font-semibold text-orange uppercase tracking-widest">Welcome</span>
        <h2 className="mt-4 text-h2 leading-[1.15] font-bold max-w-2xl mx-auto">
          Building the space where <span className="text-orange">industrial intelligence</span> meets human judgment
        </h2>
        <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
          I design context-aware decisions, agent systems, industrial data pipelines, and world models
          that connect a physical signal to a useful customer outcome.
        </p>
      </motion.div>
    </section>
  );
}
