'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/lib/theme-context';
import ServiceIllustration from './ServiceIllustration';
import { capabilities } from '@/lib/capabilities';

export type ServiceKind = typeof capabilities[number]['id'];
const services = capabilities;

function relativeOffset(index: number, active: number) {
  let offset = index - active;
  if (offset > services.length / 2) offset -= services.length;
  if (offset < -services.length / 2) offset += services.length;
  return offset;
}

function cardMotion(offset: number) {
  const visible = Math.abs(offset) <= 2;
  return {
    // Keep a deliberate edge peek on narrow screens; 23vw alone makes the
    // cards collapse into one another at phone widths.
    x: `calc(${offset} * max(23vw, 220px))`,
    y: offset === 0 ? 0 : 18,
    scale: offset === 0 ? 1 : offset === 1 || offset === -1 ? 0.84 : 0.68,
    rotateY: offset === 0 ? 0 : offset > 0 ? -28 : 28,
    rotateZ: offset === 0 ? 0 : offset > 0 ? 1.5 : -1.5,
    z: offset === 0 ? 30 : offset === 1 || offset === -1 ? 0 : -40,
    opacity: visible ? (offset === 0 ? 1 : offset === 1 || offset === -1 ? 0.72 : 0.34) : 0,
    pointerEvents: visible ? 'auto' as const : 'none' as const,
  };
}

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [autoplayNonce, setAutoplayNonce] = useState(0);
  const reducedMotion = useReducedMotion();
  const { visualMode } = useTheme();
  const regionRef = useRef<HTMLDivElement>(null);
  const resetAutoplay = useCallback(() => setAutoplayNonce((value) => value + 1), []);
  const select = useCallback((index: number) => {
    setActive((index + services.length) % services.length);
    resetAutoplay();
  }, [resetAutoplay]);
  const next = useCallback(() => {
    setActive((index) => (index + 1) % services.length);
    resetAutoplay();
  }, [resetAutoplay]);
  const previous = useCallback(() => {
    setActive((index) => (index - 1 + services.length) % services.length);
    resetAutoplay();
  }, [resetAutoplay]);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
      if (event.key === 'Home') { event.preventDefault(); select(0); }
      if (event.key === 'End') { event.preventDefault(); select(services.length - 1); }
    };
    region.addEventListener('keydown', onKeyDown);
    return () => region.removeEventListener('keydown', onKeyDown);
  }, [next, previous, select]);

  useEffect(() => {
    if (reducedMotion) return;
    const advance = window.setTimeout(() => {
      if (document.visibilityState === 'visible') next();
    }, 5000);
    return () => window.clearTimeout(advance);
  }, [active, autoplayNonce, next, reducedMotion]);

  return (
    <section id="services" className={`relative overflow-hidden px-6 py-24 md:py-32 ${visualMode === 'system' ? 'bg-grid-light dark:bg-grid-dark' : ''}`} aria-labelledby="services-heading">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-orange">Design, systems, and intelligence</p>
            <h2 id="services-heading" className="mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Make the experience feel inevitable</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-text-secondary">Start with a clear interface, then connect the systems behind it. From websites and voice flows to industrial data and world models, every layer should feel considered</p>
        </div>

        <div ref={regionRef} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Services" className="focus-visible:outline-orange">
          <div className="relative mx-auto h-[510px] max-w-[1120px] overflow-visible [perspective:1400px] md:h-[560px]">
            <motion.div
              className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -140, right: 140 }}
              dragElastic={0.08}
              dragMomentum={false}
              // Keep the gesture free while the finger is down, then always
              // return the track to its centered origin. The active card is
              // changed independently, so every input method lands on the
              // same stable position on touch and desktop.
              dragSnapToOrigin
              dragTransition={{ bounceStiffness: 360, bounceDamping: 38 }}
              onDragStart={() => setDragging(true)}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 42 || Math.abs(info.velocity.x) > 280) {
                  (info.offset.x < 0 ? next : previous)();
                }
                setDragging(false);
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {services.map((service, index) => {
                const offset = relativeOffset(index, active);
                const isActive = offset === 0;
                return (
                  <motion.article
                    key={service.id}
                    className="absolute inset-0 flex items-center justify-center"
                    animate={cardMotion(offset)}
                    transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 155, damping: 27, mass: 0.72 }}
                    style={{
                      transformStyle: 'preserve-3d',
                      // Keep the depth treatment static. Animating CSS filters
                      // forces paint work on every frame and causes jank on
                      // touch devices while the cards are springing.
                      filter: isActive ? 'none' : 'saturate(0.7) brightness(0.8)',
                    }}
                    aria-hidden={!isActive}
                  >
                    <button
                      type="button"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => !dragging && select(index)}
                      aria-label={`Show ${service.title}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative h-[460px] w-[min(72vw,360px)] overflow-hidden rounded-[2rem] border p-2.5 text-left outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-orange md:h-[500px] ${isActive ? 'border-orange/60 shadow-[0_28px_70px_rgba(255,125,31,0.22)]' : 'border-border/70 shadow-card dark:border-border-dark/70'}`}
                    >
                      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.55rem] border border-white/20 bg-gradient-to-b from-white/90 via-white/70 to-cream/80 p-5 dark:border-white/10 dark:from-charcoal-light/95 dark:via-charcoal-light/80 dark:to-charcoal/95 md:p-7">
                        <div className="pointer-events-none absolute left-1/2 top-2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-charcoal/15 dark:bg-white/15" />
                        <div className="mb-5 flex items-center justify-between pt-3"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">{service.eyebrow}</span><span className={`h-2 w-2 rounded-full ${isActive ? 'bg-orange' : 'bg-border dark:bg-border-dark'}`} aria-hidden="true" /></div>
                        <ServiceIllustration kind={service.id} active={isActive} reducedMotion={reducedMotion} />
                        <div className="mt-auto">
                          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{service.title}</h3>
                          <p className="mt-3 text-sm font-medium leading-6 text-text-primary">{service.promise}</p>
                          <p className="mt-2 text-xs leading-5 text-text-secondary">{service.outcome}</p>
                          <div className="mt-4 flex flex-wrap gap-1.5">{service.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:border-border-dark">{tag}</span>)}</div>
                          <a href={`#${service.laboratoryDemo === 'flow' ? 'laboratory' : 'laboratory'}`} onClick={(event) => event.stopPropagation()} className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-orange hover:text-orange-dark"><span className="h-1.5 w-1.5 rounded-full bg-orange" /> Explore the prototype</a>
                        </div>
                      </div>
                    </button>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 md:pr-24">
            <div className="flex items-center gap-2" role="status" aria-label={`Service ${active + 1} of ${services.length}`}>
              {services.map((service, index) => <button key={service.id} type="button" aria-label={`Go to ${service.title}`} aria-current={index === active ? 'step' : undefined} onClick={() => select(index)} className={`h-1.5 rounded-full transition-[width,background-color] duration-[180ms] ${index === active ? 'w-8 bg-orange' : 'w-2 bg-border dark:bg-border-dark'}`} />)}
            </div>
            <div className="mr-24 flex items-center gap-2 md:mr-0"><button type="button" onClick={previous} aria-label="Previous service" className="rounded-full border border-border p-3 transition-colors hover:border-orange hover:text-orange dark:border-border-dark"><ArrowLeft size={18} /></button><button type="button" onClick={next} aria-label="Next service" className="rounded-full border border-border p-3 transition-colors hover:border-orange hover:text-orange dark:border-border-dark"><ArrowRight size={18} /></button></div>
          </div>
          <AnimatePresence mode="wait"><motion.p key={active} initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -6 }} className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted" aria-live="polite">{services[active].title} / {active + 1}—{services.length}</motion.p></AnimatePresence>
        </div>
      </div>
    </section>
  );
}
