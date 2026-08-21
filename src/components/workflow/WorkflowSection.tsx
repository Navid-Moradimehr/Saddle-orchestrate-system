'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Check } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/lib/theme-context';

type FlowNode = {
  id: string;
  label: string;
  eyebrow: string;
  detail: string;
  x: number;
  y: number;
  color: string;
};

const nodes: FlowNode[] = [
  { id: 'people', label: 'Plant & customer context', eyebrow: 'INPUT', detail: 'Signals · constraints', x: 8, y: 30, color: '#5EA7FF' },
  { id: 'question', label: 'Decision point', eyebrow: 'ENTRY', detail: 'Outcome · risk', x: 8, y: 66, color: '#5EA7FF' },
  { id: 'map', label: 'Context assembly', eyebrow: 'SENSE', detail: 'History · memory · retrieval', x: 30, y: 46, color: '#B18CFF' },
  { id: 'direction', label: 'System design', eyebrow: 'DESIGN', detail: 'Semantic layer · agents · data', x: 51, y: 26, color: '#B18CFF' },
  { id: 'prototype', label: 'Twin scenario', eyebrow: 'TEST', detail: 'Simulate · compare', x: 51, y: 68, color: '#FFB52E' },
  { id: 'system', label: 'Operational loop', eyebrow: 'AUTOMATE', detail: 'MCP · routing · approvals', x: 73, y: 44, color: '#34D399' },
  { id: 'launch', label: 'Customer outcome', eyebrow: 'LIVE', detail: 'Ship · observe', x: 90, y: 26, color: '#34D399' },
  { id: 'feedback', label: 'Feedback & learning', eyebrow: 'LOOP', detail: 'Gradients · signals', x: 90, y: 71, color: '#F47DBB' },
];

const edges = [
  ['people', 'map'], ['question', 'map'], ['map', 'direction'], ['map', 'prototype'],
  ['direction', 'system'], ['prototype', 'system'], ['system', 'launch'], ['system', 'feedback'], ['feedback', 'map'],
] as const;

const moments = [
  { label: 'Understand', detail: 'Capture the site, people, and customer context', node: 'people', color: '#5EA7FF' },
  { label: 'Simplify', detail: 'Define decisions, vocabulary, and constraints', node: 'map', color: '#B18CFF' },
  { label: 'Design', detail: 'Shape tools, memory, agents, and data contracts', node: 'direction', color: '#B18CFF' },
  { label: 'Automate', detail: 'Route MCP tools, specialist agents, and approvals', node: 'system', color: '#34D399' },
  { label: 'Test', detail: 'Run twin scenarios before changing the real system', node: 'prototype', color: '#FFB52E' },
  { label: 'Launch', detail: 'Trace the outcome from site to customer and back', node: 'launch', color: '#34D399' },
];

function nodeById(id: string) {
  return nodes.find((node) => node.id === id)!;
}

function edgePath(from: FlowNode, to: FlowNode) {
  const x1 = from.x * 10;
  const y1 = from.y * 5.2;
  const x2 = to.x * 10;
  const y2 = to.y * 5.2;
  const bend = Math.max(42, Math.abs(x2 - x1) * 0.28);
  return `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
}

export default function WorkflowSection() {
  const [active, setActive] = useState(0);
  const [selectedNode, setSelectedNode] = useState('people');
  const reducedMotion = useReducedMotion();
  const { visualMode } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 78%', 'end 24%'] });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (reducedMotion && progress < 0.02) return;
    const next = Math.min(moments.length - 1, Math.floor(Math.max(0, progress) * moments.length));
    setActive((current) => {
      const resolved = Math.max(current, next);
      setSelectedNode(moments[resolved].node);
      return resolved;
    });
  });

  const selectedMoment = moments[active];
  const highlighted = selectedNode || selectedMoment.node;

  return (
    <section ref={sectionRef} id="workflow" className={`relative overflow-hidden px-6 py-24 md:py-32 ${visualMode === 'human' ? 'bg-orange/[0.035]' : 'bg-grid-light dark:bg-grid-dark'}`} aria-labelledby="workflow-heading">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-orange">A living process map</p>
            <h2 id="workflow-heading" className="mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">From site signal to customer outcome</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary">Trace the physical lifecycle and the AI lifecycle together: events become context, context becomes a decision, and every outcome feeds the next improvement</p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted"><span className="h-2 w-2 animate-pulse rounded-full bg-green" /> Live / evolving</div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Workflow moments">
          {moments.map((moment, index) => (
            <button key={moment.label} type="button" aria-pressed={active === index} onClick={() => { setActive(index); setSelectedNode(moment.node); }} className={`rounded-lg border px-3 py-2 text-left transition-[background-color,border-color,color,transform] duration-180 active:scale-[.98] focus-visible:outline-orange ${active === index ? 'border-white/20 bg-charcoal text-white dark:bg-charcoal-light' : 'border-border bg-cream/70 text-text-secondary hover:border-orange/60 dark:border-border-dark dark:bg-charcoal/60'}`}>
              <span className="flex items-center gap-2 text-xs font-semibold"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: moment.color }} />{moment.label}</span>
              <span className="mt-1 block max-w-[13rem] text-[10px] leading-4 opacity-70">{moment.detail}</span>
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-[1.75rem] border border-border-dark/80 bg-[#07101d] p-3 shadow-[0_28px_80px_rgba(2,11,20,.22)] dark:border-white/10 md:p-5">
          <div className="relative min-h-[520px] min-w-[760px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[linear-gradient(rgba(95,150,210,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(95,150,210,.07)_1px,transparent_1px)] bg-[size:44px_44px]" aria-label="Interactive workflow map" role="region">
            <div className="absolute right-5 top-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34D399]" /> Live</div>
            <svg viewBox="0 0 1000 520" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
              <defs>
                <filter id="workflow-glow"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                {[
                  ['blue', '#5EA7FF'], ['violet', '#B18CFF'], ['amber', '#FFB52E'], ['green', '#34D399'], ['pink', '#F47DBB'],
                ].map(([id, color]) => <marker key={id} id={`workflow-arrow-${id}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L8 4L0 8Z" fill={color} /></marker>)}
              </defs>
              {edges.map(([fromId, toId]) => {
                const from = nodeById(fromId); const to = nodeById(toId); const d = edgePath(from, to);
                const isActive = from.id === highlighted || to.id === highlighted || (from.id === 'feedback' && to.id === 'map' && active >= 5);
                const marker = from.color === '#5EA7FF' ? 'blue' : from.color === '#B18CFF' ? 'violet' : from.color === '#FFB52E' ? 'amber' : from.color === '#34D399' ? 'green' : 'pink';
                return <g key={`${fromId}-${toId}`} opacity={isActive ? 1 : .28}>
                  <motion.path d={d} fill="none" stroke={from.color} strokeWidth={isActive ? 2 : 1.3} strokeDasharray="8 9" markerEnd={`url(#workflow-arrow-${marker})`} filter={isActive ? 'url(#workflow-glow)' : undefined} animate={reducedMotion ? undefined : { strokeDashoffset: [0, -34] }} transition={reducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'linear' }} />
                  {isActive && !reducedMotion && <circle r="3.5" fill={from.color} filter="url(#workflow-glow)"><animateMotion path={d} dur="2.2s" repeatCount="indefinite" /></circle>}
                </g>;
              })}
            </svg>

            {nodes.map((node) => {
              const isSelected = node.id === highlighted; const isComplete = nodes.findIndex((item) => item.id === node.id) < active + 2;
              return <button key={node.id} type="button" onClick={() => setSelectedNode(node.id)} aria-pressed={isSelected} className={`absolute w-44 -translate-x-1/2 -translate-y-1/2 rounded-xl border p-3 text-center transition-[transform,opacity,box-shadow,border-color] duration-200 focus-visible:outline-orange ${isSelected ? 'z-20 scale-[1.04] shadow-[0_0_28px_rgba(94,167,255,.2)]' : 'z-10 opacity-90 hover:scale-[1.02]'}`} style={{ left: `${node.x}%`, top: `${node.y}%`, borderColor: isSelected ? node.color : `${node.color}66`, backgroundColor: isSelected ? `${node.color}33` : '#0a1728' }}>
                <span className="block font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: node.color }}>{node.eyebrow}</span>
                <span className="mt-2 block text-sm font-semibold text-white">{node.label}</span>
                <span className="mt-1 block font-mono text-[9px] text-white/55">{node.detail}</span>
                {isComplete && <Check size={12} className="absolute -right-1 -top-1 rounded-full bg-emerald-400 p-0.5 text-[#07101d]" />}
              </button>;
            })}
            <span className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">site signal → model → agent → customer → learning</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted" aria-label="Workflow color legend">
          {[['#5EA7FF', 'Human signal'], ['#B18CFF', 'Clarity'], ['#FFB52E', 'Prototype'], ['#34D399', 'System'], ['#F47DBB', 'Feedback']].map(([color, label]) => <span key={label} className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />{label}</span>)}
        </div>
        <div className="mt-5 flex items-center gap-3 text-xs text-text-muted"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: selectedMoment.color }} /> Currently exploring <span className="font-semibold text-text-primary">{selectedMoment.label}</span><span className="text-text-muted">— {selectedMoment.detail}</span></div>
      </div>
    </section>
  );
}
