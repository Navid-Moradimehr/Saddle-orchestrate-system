'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ProjectType } from './ContactSection';

type Props = { type: ProjectType };
const fields: Record<ProjectType, { label: string; placeholder: string }[]> = {
  decisions: [{ label: 'What decision needs context?', placeholder: 'The action, constraint, and desired outcome' }, { label: 'Where does the signal live?', placeholder: 'Plant, product, data platform, or workflow' }],
  'agent-infrastructure': [{ label: 'Which tools should agents use?', placeholder: 'APIs, databases, machines, or internal tools' }, { label: 'What must be observable?', placeholder: 'Permissions, retries, traces, or evaluation' }],
  memory: [{ label: 'What should be remembered?', placeholder: 'The context that makes future work better' }, { label: 'What must expire or stay private?', placeholder: 'Retention, governance, and human control' }],
  'industrial-agents': [{ label: 'Where should the agent enter?', placeholder: 'A plant, operating process, or customer loop' }, { label: 'What is the human handoff?', placeholder: 'The decision that still needs a person' }],
  'data-pipelines': [{ label: 'What events are moving?', placeholder: 'Sensors, production, quality, or delivery signals' }, { label: 'Where should insight land?', placeholder: 'Streaming views, analytics, or durable storage' }],
  'world-models': [{ label: 'What future should be tested?', placeholder: 'An intervention, process change, or operating condition' }, { label: 'What makes a result trustworthy?', placeholder: 'Constraints, confidence, and fallback rules' }],
};

export default function AdaptiveContactForm({ type }: Props) {
  const [sent, setSent] = useState(false);
  return <motion.div key={type} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-white/60 p-5 dark:border-border-dark dark:bg-charcoal-light/50"><div className="grid gap-4 md:grid-cols-2">{fields[type].map((field) => { const name = field.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'); const email = field.placeholder.includes('@'); return <label key={field.label} className="text-sm font-medium">{field.label}<input name={name} type={email ? 'email' : 'text'} inputMode={email ? 'email' : 'text'} autoComplete="off" spellCheck={false} placeholder={field.placeholder} className="mt-2 w-full rounded-xl border border-border bg-cream px-3 py-3 text-sm font-normal transition-[border-color,box-shadow] placeholder:text-text-muted focus:border-orange focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-1 dark:border-border-dark dark:bg-charcoal" /></label>; })}</div><button type="button" onClick={() => setSent(true)} className="mt-5 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark">{sent ? 'Message staged ✓' : 'Stage the conversation'}</button>{sent && <p className="mt-3 text-xs text-text-secondary" role="status">This prototype does not send messages, but the next step is ready.</p>}</motion.div>;
}
