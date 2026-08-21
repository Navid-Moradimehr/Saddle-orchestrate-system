'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, Database, GitBranch, Layers3, Network, Server, ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import EnergyConnection from './EnergyConnection';

const heroMessages = [
  { title: <>Turn bold ideas into <span className="text-orange">useful products</span></>, body: 'We design thoughtful interfaces and build the systems behind them for real people and real work' },
  { title: <>Human creativity<br /><span className="text-orange">×</span><br />AI systems</>, body: 'People bring judgment and imagination; AI helps turn that thinking into useful work' },
  { title: <>Make every decision <span className="text-orange">improve the next</span></>, body: 'Connect knowledge, action, and feedback so teams learn faster and move with confidence' },
] as const;

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [activeScene, setActiveScene] = useState(0);

  if (reducedMotion) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
        <HeroMedia reducedMotion activeScene={activeScene} />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20">
          <h1 className="text-display leading-[1.05] font-black tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]">
            Turn bold ideas into
            <br />
            <span className="text-orange">useful products</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-xl text-white/80">
            We design thoughtful interfaces and build the systems behind them for real people and real work
          </p>
        </div>
        <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-40" />
      </section>
    );
  }

  return (
    <section
      className="relative min-h-screen overflow-clip"
      id="hero"
    >
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <HeroMedia activeScene={activeScene} />

        {/* A quiet grid veil keeps the media tied to the site's visual system. */}
        <div className="absolute inset-0 z-5 bg-grid-light dark:bg-grid-dark opacity-20 mix-blend-screen" />

        {/* Particles */}
        <motion.div className="absolute inset-0 z-15 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1.2 }}>
          <HeroParticles />
        </motion.div>

        <HeroCopyCarousel active={activeScene} setActive={setActiveScene} reducedMotion={reducedMotion} />

        {/* Headline */}
        <motion.div
          className="hidden"
        >
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-black tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]">
            Human creativity
            <br />
            <motion.span
              className="text-orange inline-block"
              animate={{ scale: [1, 1.15, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              ×
            </motion.span>
            <br />
            intelligent systems
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-xl text-white/80">
            Digital product design, interfaces, and industrial intelligence
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hidden"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-text-muted flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-3 rounded-full bg-orange"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroCopyCarousel({ active, setActive, reducedMotion }: { active: number; setActive: (value: number | ((current: number) => number)) => void; reducedMotion: boolean }) {
  useEffect(() => {
    if (reducedMotion) return;
    const advance = window.setInterval(() => {
      if (document.visibilityState === 'visible') setActive((value) => (value + 1) % heroMessages.length);
    }, 5000);
    return () => window.clearInterval(advance);
  }, [reducedMotion, setActive]);
  return <div className="pointer-events-none absolute right-[5vw] top-[24%] z-30 h-[320px] w-[min(36rem,38vw)] overflow-hidden text-center text-white max-md:left-6 max-md:right-6 max-md:top-[16%] max-md:h-[240px] max-md:w-auto"><div className="relative h-full">{reducedMotion ? <HeroCopySlide message={heroMessages[0]} reducedMotion /> : <AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -28 }} transition={{ duration: .65, ease: [0.23, 1, 0.32, 1] }}><h1 className="text-[clamp(2.15rem,4vw,3.5rem)] font-black leading-[1.04] tracking-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]">{heroMessages[active].title}</h1><p className="mx-auto mt-6 max-w-xl text-lg leading-7 text-white/80 md:text-xl">{heroMessages[active].body}</p></motion.div></AnimatePresence>}</div></div>;
}

function HeroCopySlide({ message, reducedMotion }: { message: { title: React.ReactNode; body: string }; reducedMotion: boolean }) {
  return <motion.div initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }}><h1 className="text-[clamp(2.15rem,4vw,3.5rem)] font-black leading-[1.04] tracking-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]">{message.title}</h1><p className="mt-6 max-w-xl text-lg leading-7 text-white/80 md:text-xl">{message.body}</p></motion.div>;
}

function HeroMedia({ reducedMotion = false, activeScene }: { reducedMotion?: boolean; activeScene: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020b14]" aria-hidden="true">
      <Image src="/assets/hero/connection-background.webp" alt="" fill preload sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,11,20,.18),rgba(2,11,20,.52))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_31%_52%,rgba(59,130,246,.17),transparent_31%),radial-gradient(circle_at_57%_50%,rgba(194,65,12,.13),transparent_27%),linear-gradient(90deg,rgba(2,11,20,.22),rgba(2,11,20,.34))]" />
      <div className="absolute inset-0 bg-grid-dark opacity-50" />
      <div className="absolute left-[8vw] top-[20%] h-[54vh] w-[42vw] max-md:left-4 max-md:top-[40%] max-md:h-[32vh] max-md:w-[82vw]">
        <AnimatePresence mode="wait">
          <motion.div key={activeScene} className="h-full w-full" initial={reducedMotion ? false : { opacity: 0, scale: .92, rotateY: 12 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} exit={reducedMotion ? undefined : { opacity: 0, scale: 1.04, rotateY: -12 }} transition={{ duration: .7, ease: [0.22, 1, .36, 1] }} style={{ perspective: 900 }}>
            <HeroScene scene={activeScene} reducedMotion={reducedMotion} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function LegacyHeroScene({ scene, reducedMotion }: { scene: number; reducedMotion: boolean }) {
  if (scene === 1) return <div className="relative flex h-full items-center justify-center [transform-style:preserve-3d]"><motion.div className="absolute h-44 w-44 rounded-full border border-blue/50 bg-blue/10 shadow-[0_0_70px_rgba(59,130,246,.25)]" animate={reducedMotion ? undefined : { rotateX: [58, 62, 58], rotateZ: [0, 360] }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} /><motion.div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-orange/50 bg-orange/20 shadow-[0_0_50px_rgba(194,65,12,.35)] [transform:rotateX(14deg)_rotateY(-18deg)]" animate={reducedMotion ? undefined : { y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}><Network size={38} className="text-orange" /><span className="absolute -right-9 -top-7 h-3 w-3 rounded-full bg-green shadow-[0_0_16px_#22c55e]" /><span className="absolute -bottom-6 -left-10 h-2 w-2 rounded-full bg-blue shadow-[0_0_14px_#3b82f6]" /></motion.div><span className="absolute bottom-[16%] font-mono text-[10px] uppercase tracking-[.24em] text-white/45">context → decision</span></div>;
  if (scene === 2) return <div className="relative flex h-full items-center justify-center [transform-style:preserve-3d]"><div className="grid grid-cols-2 gap-4 [transform:rotateX(58deg)_rotateZ(-12deg)] [transform-style:preserve-3d]">{[Server, Database, GitBranch, ShieldCheck].map((Icon, index) => <motion.div key={index} className="flex h-24 w-24 items-center justify-center rounded-2xl border border-green/40 bg-green/10 shadow-[0_18px_30px_rgba(34,197,94,.12)]" animate={reducedMotion ? undefined : { z: [0, 12, 0], y: [0, index % 2 ? -5 : 5, 0] }} transition={{ duration: 2.8 + index * .2, repeat: Infinity, ease: 'easeInOut', delay: index * .1 }}><Icon size={28} className={index === 3 ? 'text-orange' : 'text-green'} /></motion.div>)}</div><motion.div className="absolute bottom-[14%] flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.24em] text-white/45" animate={reducedMotion ? undefined : { opacity: [.45, 1, .45] }} transition={{ duration: 2.5, repeat: Infinity }}><Activity size={14} className="text-orange" /> operational loop</motion.div></div>;
  return <div className="relative flex h-full items-center justify-center [transform-style:preserve-3d]"><motion.div className="relative h-48 w-64 rounded-[2rem] border border-white/20 bg-white/[.06] p-5 shadow-[0_30px_80px_rgba(59,130,246,.16)] [transform:rotateX(58deg)_rotateZ(-8deg)] [transform-style:preserve-3d]" animate={reducedMotion ? undefined : { rotateZ: [-8, -3, -8], y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}><div className="flex items-center justify-between"><Layers3 size={18} className="text-blue" /><Sparkles size={15} className="text-orange" /></div><div className="mt-5 grid grid-cols-3 gap-2">{[1, 2, 3, 4, 5, 6].map((item) => <span key={item} className="h-8 rounded-lg border border-blue/30 bg-blue/10" />)}</div><div className="mt-4 h-2 w-3/4 rounded-full bg-white/15" /></motion.div><motion.div className="absolute -right-2 top-[26%] h-4 w-4 rounded-full bg-orange shadow-[0_0_20px_#c2410c]" animate={reducedMotion ? undefined : { x: [-20, 18, -20], y: [8, -12, 8] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} /><span className="absolute bottom-[14%] font-mono text-[10px] uppercase tracking-[.24em] text-white/45">interface as invitation</span></div>;
}

function PreviousHeroScene({ scene, reducedMotion }: { scene: number; reducedMotion: boolean }) {
  if (scene === 1) return <div className="relative flex h-full items-center justify-center [perspective:900px]"><motion.div className="absolute h-56 w-56 rounded-full border border-blue/35 bg-blue/5 shadow-[0_0_100px_rgba(59,130,246,.25)] [transform:rotateX(68deg)]" animate={reducedMotion ? undefined : { rotateZ: [0, 360] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} /><motion.div className="absolute h-44 w-44 rounded-full border border-orange/35 [transform:rotateY(68deg)]" animate={reducedMotion ? undefined : { rotateZ: [360, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} /><div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-[2.2rem] border border-orange/55 bg-[#101d2d]/80 shadow-[0_0_70px_rgba(194,65,12,.42)] [transform:rotateX(16deg)_rotateY(-20deg)]"><EnergyConnection /><Network size={28} className="absolute text-orange" /></div><motion.div className="absolute left-[10%] top-[16%] flex items-center gap-2 rounded-xl border border-white/15 bg-[#081827]/85 px-3 py-2 font-mono text-[9px] uppercase tracking-[.16em] text-white/65 shadow-xl [transform:translateZ(80px)_rotateY(12deg)]" animate={reducedMotion ? undefined : { y: [0, -9, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}><Layers3 size={14} className="text-blue" /> interface</motion.div><motion.div className="absolute bottom-[20%] right-[4%] flex items-center gap-2 rounded-xl border border-white/15 bg-[#081827]/85 px-3 py-2 font-mono text-[9px] uppercase tracking-[.16em] text-white/65 shadow-xl [transform:translateZ(70px)_rotateY(-10deg)]" animate={reducedMotion ? undefined : { y: [0, 8, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: .4 }}><Sparkles size={14} className="text-orange" /> signal</motion.div><span className="absolute bottom-[6%] font-mono text-[9px] uppercase tracking-[.24em] text-white/45">context in motion</span></div>;
  if (scene === 2) return <div className="relative flex h-full items-center justify-center [perspective:1000px]"><div className="absolute h-64 w-72 rounded-[2.5rem] border border-green/20 bg-green/5 [transform:rotateX(64deg)_rotateZ(-14deg)]" /><div className="relative z-10 grid grid-cols-2 gap-3 [transform:rotateX(55deg)_rotateZ(-12deg)] [transform-style:preserve-3d]">{[Server, Database, GitBranch, ShieldCheck].map((Icon, index) => <motion.div key={index} className="relative flex h-24 w-28 items-center justify-center rounded-2xl border border-green/45 bg-[#0b2530]/90 shadow-[0_22px_38px_rgba(34,197,94,.18)]" animate={reducedMotion ? undefined : { y: [0, index % 2 ? -8 : 8, 0], z: [0, 18, 0] }} transition={{ duration: 2.8 + index * .2, repeat: Infinity, ease: 'easeInOut', delay: index * .12 }}><span className="absolute inset-x-3 top-3 h-px bg-gradient-to-r from-transparent via-green/70 to-transparent" /><Icon size={28} className={index === 3 ? 'text-orange' : 'text-green'} /></motion.div>)}</div><motion.div className="absolute left-[17%] top-[22%] h-px w-[66%] origin-left bg-gradient-to-r from-orange/0 via-orange to-blue/0" animate={reducedMotion ? undefined : { scaleX: [0, 1, 0], opacity: [.2, 1, .2] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} /><motion.div className="absolute bottom-[8%] flex items-center gap-2 rounded-full border border-white/15 bg-[#081827]/85 px-4 py-2 font-mono text-[9px] uppercase tracking-[.22em] text-white/55" animate={reducedMotion ? undefined : { opacity: [.5, 1, .5] }} transition={{ duration: 2.5, repeat: Infinity }}><Activity size={14} className="text-orange" /> operational loop</motion.div></div>;
  return <div className="relative flex h-full items-center justify-center [perspective:1000px]"><motion.div className="relative h-52 w-72 rounded-[2rem] border border-white/25 bg-[#0a1828]/85 p-5 shadow-[0_30px_80px_rgba(59,130,246,.28)] [transform:rotateX(58deg)_rotateZ(-9deg)]" animate={reducedMotion ? undefined : { y: [0, -10, 0], rotateZ: [-9, -4, -9] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}><div className="flex items-center justify-between border-b border-white/10 pb-3"><Layers3 size={18} className="text-blue" /><span className="font-mono text-[9px] uppercase tracking-[.2em] text-white/45">live canvas</span><Sparkles size={15} className="text-orange" /></div><div className="mt-5 grid grid-cols-3 gap-2">{[1, 2, 3, 4, 5, 6].map((item, index) => <motion.span key={item} className={`h-9 rounded-lg border ${index === 1 ? 'border-orange/60 bg-orange/20' : 'border-blue/30 bg-blue/10'}`} animate={reducedMotion ? undefined : { opacity: index === 1 ? [.45, 1, .45] : [.6, .9, .6] }} transition={{ duration: 2 + index * .12, repeat: Infinity, ease: 'easeInOut' }} />)}</div><div className="mt-5 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green shadow-[0_0_10px_#22c55e]" /><span className="h-2 w-2/3 rounded-full bg-white/15" /></div></motion.div><motion.div className="absolute right-[4%] top-[23%] h-4 w-4 rounded-full bg-orange shadow-[0_0_24px_#c2410c]" animate={reducedMotion ? undefined : { x: [-26, 24, -26], y: [10, -12, 10] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} /><span className="absolute bottom-[8%] font-mono text-[9px] uppercase tracking-[.24em] text-white/45">interface as invitation</span></div>;
}

function HeroScene({ scene, reducedMotion }: { scene: number; reducedMotion: boolean }) {
  if (scene === 1) return <ContextConvergenceScene reducedMotion={reducedMotion} />;
  if (scene === 2) return <DecisionLoopScene reducedMotion={reducedMotion} />;
  return <IdeasTakingShapeScene reducedMotion={reducedMotion} />;
}

function IdeasTakingShapeScene({ reducedMotion }: { reducedMotion: boolean }) {
  const panels = [
    { label: 'Discover', left: '10%', top: '18%', width: '42%', delay: 0, accent: false },
    { label: 'Design', left: '42%', top: '13%', width: '35%', delay: .12, accent: true },
    { label: 'Build', left: '18%', top: '47%', width: '30%', delay: .22, accent: false },
    { label: 'Refine', left: '50%', top: '43%', width: '39%', delay: .32, accent: false },
  ];
  return (
    <div className="relative h-full w-full [perspective:1000px]">
      <motion.div
        className="absolute inset-[10%_4%_16%_4%] rounded-[2rem] border border-white/20 bg-[#081827]/75 shadow-[0_34px_90px_rgba(59,130,246,.24)] [transform:rotateX(54deg)_rotateZ(-8deg)] [transform-style:preserve-3d]"
        animate={reducedMotion ? undefined : { transform: ['rotateX(54deg) rotateZ(-8deg) translateY(0px)', 'rotateX(54deg) rotateZ(-4deg) translateY(-8px)', 'rotateX(54deg) rotateZ(-8deg) translateY(0px)'] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: [0.77, 0, 0.175, 1] }}
      >
        {panels.map((panel) => (
          <motion.div
            key={panel.label}
            className={`absolute flex h-[24%] items-center justify-center rounded-xl border font-mono text-[8px] uppercase tracking-[.16em] text-white/70 ${panel.accent ? 'border-orange/70 bg-orange/20' : 'border-blue/35 bg-blue/10'}`}
            style={{ left: panel.left, top: panel.top, width: panel.width }}
            animate={reducedMotion ? undefined : { transform: ['translateZ(0px)', `translateZ(${panel.accent ? 34 : 18}px)`, 'translateZ(0px)'], opacity: [.58, 1, .58] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: panel.delay }}
          >
            {panel.label}
          </motion.div>
        ))}
        <div className="absolute bottom-[14%] left-[10%] h-1.5 w-[62%] rounded-full bg-white/12">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-blue to-orange" animate={reducedMotion ? undefined : { transform: ['scaleX(.18)', 'scaleX(1)', 'scaleX(.18)'] }} style={{ transformOrigin: 'left' }} transition={{ duration: 4, repeat: Infinity, ease: [0.77, 0, 0.175, 1] }} />
        </div>
      </motion.div>
      <motion.span className="absolute left-[14%] top-[22%] h-3 w-3 rounded-full bg-orange shadow-[0_0_24px_#c2410c]" animate={reducedMotion ? undefined : { transform: ['translate3d(0px,22px,0)', 'translate3d(0px,-22px,0)', 'translate3d(0px,22px,0)'] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
      <span className="absolute bottom-[5%] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[.24em] text-white/55">From idea to working product</span>
    </div>
  );
}

function ContextConvergenceScene({ reducedMotion }: { reducedMotion: boolean }) {
  const context = [
    { label: 'Human judgment', left: '1%', top: '16%', transform: 'translate3d(0,0,36px)' },
    { label: 'AI capability', left: '66%', top: '14%', transform: 'translate3d(0,0,24px)' },
    { label: 'Shared context', left: '5%', top: '68%', transform: 'translate3d(0,0,18px)' },
    { label: 'Real constraints', left: '70%', top: '66%', transform: 'translate3d(0,0,30px)' },
  ];
  return (
    <div className="relative h-full w-full [perspective:950px]">
      <div className="absolute left-1/2 top-1/2 h-px w-[72%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-blue/60 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[62%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-orange/60 to-transparent" />
      {context.map((item, index) => (
        <motion.div
          key={item.label}
          className="absolute flex h-14 w-32 items-center justify-center rounded-xl border border-white/18 bg-[#081827]/88 px-3 text-center font-mono text-[8px] uppercase leading-4 tracking-[.14em] text-white/70 shadow-[0_16px_38px_rgba(0,0,0,.28)]"
          style={{ left: item.left, top: item.top, transform: item.transform }}
          animate={reducedMotion ? undefined : { transform: [item.transform, `${item.transform} translate(${index % 2 ? -8 : 8}px,${index < 2 ? 7 : -7}px)`, item.transform], borderColor: ['rgba(255,255,255,.18)', index % 2 ? 'rgba(59,130,246,.75)' : 'rgba(194,65,12,.75)', 'rgba(255,255,255,.18)'] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: [0.77, 0, 0.175, 1], delay: index * .16 }}
        >
          {item.label}
        </motion.div>
      ))}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex h-32 w-40 items-center justify-center rounded-[2rem] border border-orange/55 bg-[#0d1d2d]/95 shadow-[0_0_70px_rgba(194,65,12,.34),0_24px_42px_rgba(0,0,0,.35)] [transform-style:preserve-3d]"
          animate={reducedMotion ? undefined : { transform: ['rotateX(10deg) rotateY(-12deg) translateY(0px)', 'rotateX(5deg) rotateY(12deg) translateY(-6px)', 'rotateX(10deg) rotateY(-12deg) translateY(0px)'] }}
          transition={{ duration: 5, repeat: Infinity, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="text-center">
            <span className="block font-mono text-[8px] uppercase tracking-[.2em] text-orange">Human + AI</span>
            <span className="mt-2 block text-sm font-semibold text-white">A useful outcome</span>
          </div>
        </motion.div>
      </div>
      <span className="absolute bottom-[5%] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[.24em] text-white/55">Ideas, amplified together</span>
    </div>
  );
}

function DecisionLoopScene({ reducedMotion }: { reducedMotion: boolean }) {
  const stages = [
    { label: 'Notice', left: '50%', top: '5%', depth: 32 },
    { label: 'Decide', left: '94%', top: '50%', depth: 42 },
    { label: 'Act', left: '50%', top: '95%', depth: 28 },
    { label: 'Learn', left: '6%', top: '50%', depth: 38 },
  ];
  return (
    <div className="relative h-full w-full [perspective:1100px]">
      <div className="absolute inset-[3%_4%_14%] flex items-center justify-center">
        <motion.div
          className="relative h-64 w-72 [transform-style:preserve-3d]"
          animate={reducedMotion ? { transform: 'rotateX(52deg) rotateZ(-9deg)' } : { transform: ['rotateX(52deg) rotateZ(-9deg) translateY(0px)', 'rotateX(55deg) rotateZ(-4deg) translateY(-5px)', 'rotateX(52deg) rotateZ(-9deg) translateY(0px)'] }}
          transition={{ duration: 6.4, repeat: Infinity, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="absolute inset-0 rounded-full border border-green/20 bg-[#031620]/45 shadow-[0_36px_65px_rgba(0,0,0,.45)] [transform:translateZ(-18px)]" />
          <div className="absolute inset-0 rounded-full border border-green/55 bg-green/[.045] shadow-[inset_0_0_42px_rgba(34,197,94,.09),0_0_70px_rgba(34,197,94,.16)] [transform:translateZ(0px)]">
            <div className="absolute inset-6 rounded-full border border-dashed border-blue/50" />
          </div>
          <motion.div className="absolute inset-0 [transform-style:preserve-3d]" animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 6.8, repeat: Infinity, ease: 'linear' }}>
            <span className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-orange shadow-[0_0_24px_#c2410c] [transform:translateZ(18px)]" />
          </motion.div>
          {stages.map((stage, index) => (
            <motion.div
              key={stage.label}
              className="absolute flex h-12 min-w-28 items-center justify-center rounded-xl border border-white/25 bg-[#081827]/95 px-4 font-mono text-[10px] font-semibold uppercase leading-none tracking-[.12em] text-white/90 shadow-[0_14px_0_#04101b,0_24px_35px_rgba(0,0,0,.38)] drop-shadow-[0_1px_4px_rgba(0,0,0,.8)]"
              style={{ left: stage.left, top: stage.top, transform: `translate(-50%, -50%) translateZ(${stage.depth}px)` }}
              animate={reducedMotion ? undefined : { borderColor: ['rgba(255,255,255,.2)', index === 1 ? 'rgba(194,65,12,.9)' : 'rgba(34,197,94,.75)', 'rgba(255,255,255,.2)'] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: index * 1.7 }}
            >
              {stage.label}
            </motion.div>
          ))}
          <div className="absolute left-1/2 top-1/2 flex h-28 w-28 items-center justify-center rounded-full border border-orange/55 bg-[#0d1d2d] text-center shadow-[0_14px_0_#07111d,0_0_54px_rgba(194,65,12,.3)] [transform:translate(-50%,-50%)_translateZ(46px)]">
            <span className="font-mono text-[9px] font-semibold uppercase leading-4 tracking-[.14em] text-white/80">A better<br />next step</span>
          </div>
        </motion.div>
      </div>
      <span className="absolute bottom-[1%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-[#081827]/75 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-white/80 shadow-[0_12px_28px_rgba(0,0,0,.28)] backdrop-blur-sm max-md:text-[9px]">Decide, act, learn, repeat</span>
    </div>
  );
}

function HeroParticles() {
  return (
    <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {Array.from({ length: 25 }).map((_, i) => {
        const cx = 400 + ((i * 83) % 400);
        const cy = 200 + ((i * 137) % 400);
        const r = 1 + (i % 3) * 0.5;
        const delay = (i * 0.37) % 3;
        const duration = 2 + (i % 4) * 0.5;
        return (
          <circle key={i} cx={cx} cy={cy} r={r} className="fill-orange">
            <animate attributeName="opacity" values="0;0.8;0" dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="r" values={`${r};${r * 2};${r}`} dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
      {/* Energy lines */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = 600;
        const y1 = 400;
        const len = 40 + (i % 5) * 12;
        const x2 = x1 + Math.cos(angle) * len;
        const y2 = y1 + Math.sin(angle) * len;
        const duration = 2 + (i % 3) * 0.5;
        const travelDuration = 3 + (i % 4) * 0.5;
        return (
          <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-orange" strokeWidth="0.5" opacity="0.6">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${duration}s`} repeatCount="indefinite" />
            <animate attributeName="x2" values={`${x2};${x2 + Math.cos(angle) * 15}`} dur={`${travelDuration}s`} repeatCount="indefinite" />
            <animate attributeName="y2" values={`${y2};${y2 + Math.sin(angle) * 15}`} dur={`${travelDuration}s`} repeatCount="indefinite" />
          </line>
        );
      })}
    </svg>
  );
}
