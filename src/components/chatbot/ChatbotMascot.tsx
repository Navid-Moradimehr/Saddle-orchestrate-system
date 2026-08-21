'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ChatbotPanel from './ChatbotPanel';

export type ChatbotState = 'sleeping' | 'waking' | 'idle' | 'hovering' | 'thinking' | 'typing' | 'happy' | 'closing';
type Message = { from: 'bot' | 'user'; text: string };
const CONTACT_EMAIL = 'saddleorchestratesystem@gmail.com';
const answers: Record<string, string> = {
  'What can you build for our team?': `We design useful digital products and industrial AI systems: context-aware decision tools, agent harnesses, MCP servers, grounded knowledge layers, data platforms, and cloud infrastructure. For a tailored direction, contact ${CONTACT_EMAIL}`,
  'Can you design an industrial AI system?': `Yes. We can map the operational context, connect the right data, design the agent workflow, and put human review and measurable outcomes around it. Tell us what operation you want to improve at ${CONTACT_EMAIL}`,
  'How do MCP servers and agent harnesses fit together?': `MCP servers give agents reliable tools and data contracts; an agent harness adds planning, permissions, memory, observability, and handoffs. We design the boundary between them so the system stays useful and governable. Ask for an architecture review at ${CONTACT_EMAIL}`,
  'How do you keep AI answers grounded?': `We combine retrieval-augmented generation, embeddings, semantic search, semantic layers, source-linked answers, and evaluation paths so a response can be traced back to evidence. Contact ${CONTACT_EMAIL} to discuss your knowledge base`,
  'Can you help with cloud and data infrastructure?': `Yes. We work across AWS foundations such as EC2, Fargate, ECR, Lambda, and networking, alongside Kafka, Flink, Spark, and MinIO pipelines. Share your current stack and constraints at ${CONTACT_EMAIL}`,
  'How do we start a project?': `Send a short description of the decision, workflow, or product that needs attention. We will turn it into a focused first conversation and recommend a practical next step. Write to ${CONTACT_EMAIL}`,
};

function RobotMascot({ state, pupil }: { state: ChatbotState; pupil: { x: number; y: number } }) {
  const sleeping = state === 'sleeping';
  const happy = state === 'happy';
  return <svg viewBox="0 0 96 112" className="h-14 w-12 overflow-visible" aria-hidden="true">
    <ellipse cx="48" cy="105" rx="27" ry="5" fill="currentColor" opacity=".12" />
    <motion.g animate={sleeping ? { y: 3 } : { y: 0 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
      <path d="M17 72c-10 2-14 9-14 16 8 2 15-1 20-7M79 72c10 2 14 9 14 16-8 2-15-1-20-7" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M28 72h40v25H28z" fill="currentColor" opacity=".18" stroke="currentColor" strokeWidth="2" />
      <rect x="16" y="17" width="64" height="55" rx="18" fill="currentColor" className="text-charcoal dark:text-cream" />
      <rect x="22" y="24" width="52" height="34" rx="11" fill="var(--color-orange)" />
      {sleeping ? <><path d="M32 40h10m12 0h10" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></> : <><motion.circle cx={37 + pupil.x} cy={39 + pupil.y} r="6" fill="white" animate={happy ? { scale: [1, .7, 1] } : undefined} /><motion.circle cx={59 + pupil.x} cy={39 + pupil.y} r="6" fill="white" animate={happy ? { scale: [1, .7, 1] } : undefined} /></>}
      <motion.path d={happy ? 'M38 49c6 7 14 7 20 0' : 'M41 50c5 3 9 3 14 0'} fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <motion.path d="M48 17V7m0 0-6 5m6-5 6 5" fill="none" stroke="currentColor" className="text-charcoal dark:text-cream" strokeWidth="3" strokeLinecap="round" animate={state === 'waking' ? { rotate: [0, -12, 12, 0] } : undefined} />
      <motion.rect x="22" y="23" width="52" height="17" rx="9" fill="var(--color-orange)" opacity=".65" animate={sleeping ? { y: 32 } : { y: 23 }} transition={{ duration: .25 }} />
      <circle cx="25" cy="66" r="3" fill="var(--color-green)" /><circle cx="71" cy="66" r="3" fill="var(--color-blue)" />
    </motion.g>
  </svg>;
}

export default function ChatbotMascot() {
  const [state, setState] = useState<ChatbotState>('sleeping');
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ from: 'bot', text: 'Hi. I am a tiny guide to this little world' }]);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const mascotButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const reducedMotion = useReducedMotion();
  const timer = useRef<number | null>(null);
  const sequenceTimers = useRef<number[]>([]);
  const schedule = (callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay);
    sequenceTimers.current.push(id);
  };
  const resetSleepTimer = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => { if (!open) setState('sleeping'); }, 60000);
  }, [open]);
  const wake = useCallback(() => {
    setState('waking');
    setOpen(true);
    schedule(() => setState('idle'), reducedMotion ? 0 : 550);
  }, [reducedMotion]);
  useEffect(() => {
    if (open) wasOpen.current = true;
    if (!open && wasOpen.current) {
      mascotButtonRef.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);
  useEffect(() => {
    resetSleepTimer();
    const scheduled = sequenceTimers.current;
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      scheduled.forEach((id) => window.clearTimeout(id));
    };
  }, [resetSleepTimer]);
  useEffect(() => {
    const onActivity = () => resetSleepTimer();
    const onPointerMove = (event: PointerEvent) => {
      const mascot = mascotButtonRef.current;
      if (mascot) {
        const rect = mascot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setPupil({ x: Math.max(-3, Math.min(3, (event.clientX - centerX) / 55)), y: Math.max(-3, Math.min(3, (event.clientY - centerY) / 55)) });
      }
      onActivity();
    };
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerdown', onActivity, { passive: true });
    document.addEventListener('keydown', onActivity);
    document.addEventListener('touchstart', onActivity, { passive: true });
    window.addEventListener('scroll', onActivity, { passive: true });
    return () => { document.removeEventListener('pointermove', onPointerMove); document.removeEventListener('pointerdown', onActivity); document.removeEventListener('keydown', onActivity); document.removeEventListener('touchstart', onActivity); window.removeEventListener('scroll', onActivity); };
  }, [resetSleepTimer]);
  const ask = (question: string) => {
    setMessages((current) => [...current, { from: 'user', text: question }]);
    setState('thinking');
    schedule(() => {
      setState('typing');
      schedule(() => {
        setMessages((current) => [...current, { from: 'bot', text: answers[question] ?? `I can help map that to the right capability. Send the context and your goal to ${CONTACT_EMAIL}, and we will follow up with a considered response` }]);
        setState('happy');
        schedule(() => setState('idle'), reducedMotion ? 0 : 900);
      }, reducedMotion ? 0 : 500);
    }, reducedMotion ? 0 : 350);
  };
  const close = () => {
    setState('closing');
    setOpen(false);
    schedule(() => setState('sleeping'), reducedMotion ? 0 : 350);
  };
  return <>
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 sm:right-5">
      {state === 'sleeping' && <motion.span aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute -top-8 right-0 font-mono text-xs text-text-muted">z z</motion.span>}
      <motion.button ref={mascotButtonRef} type="button" onClick={open ? close : wake} whileHover={reducedMotion ? undefined : { y: -4 }} aria-label={open ? 'Close chat' : 'Open little helper'} aria-expanded={open} aria-controls="chat-panel" className="group relative flex h-20 w-20 items-center justify-center rounded-2xl border border-orange/30 bg-cream shadow-card dark:bg-charcoal"><span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green shadow-[0_0_12px_rgba(34,197,94,.7)]" /><RobotMascot state={state} pupil={pupil} /><MessageCircle size={14} className="absolute bottom-1 right-1 text-orange" /></motion.button>
    </div>
    <ChatbotPanel open={open} state={state} messages={messages} onClose={close} onAsk={ask} />
  </>;
}
