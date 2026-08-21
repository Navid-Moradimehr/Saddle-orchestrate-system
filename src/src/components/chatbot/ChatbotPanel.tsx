'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X } from 'lucide-react';
import type { ChatbotState } from './ChatbotMascot';

type Message = { from: 'bot' | 'user'; text: string };
type Props = { open: boolean; state: ChatbotState; onClose: () => void; onAsk: (question: string) => void; messages: Message[] };

const prompts = [
  'What can you build for our team?',
  'Can you design an industrial AI system?',
  'How do MCP servers and agent harnesses fit together?',
  'How do you keep AI answers grounded?',
  'Can you help with cloud and data infrastructure?',
  'How do we start a project?',
];

export default function ChatbotPanel({ open, state, onClose, onAsk, messages }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const busy = state === 'thinking' || state === 'typing';

  useEffect(() => { if (open) closeRef.current?.focus(); }, [open]);
  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, state, open]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? []);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return <AnimatePresence>
    {open && <motion.div
      id="chat-panel"
      ref={panelRef}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
      aria-describedby="chat-description"
      initial={{ opacity: 0, y: 12, scale: .97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: .98 }}
      transition={{ duration: .22, ease: [0.23, 1, 0.32, 1] }}
      className="fixed bottom-[calc(max(1rem,env(safe-area-inset-bottom))+6rem)] right-[max(.625rem,env(safe-area-inset-right))] z-[100] flex max-h-[min(680px,calc(100dvh-7.5rem))] w-[min(380px,calc(100vw-1.25rem))] origin-bottom-right flex-col overflow-hidden overscroll-contain rounded-2xl border border-border bg-cream shadow-2xl dark:border-border-dark dark:bg-charcoal"
    >
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border p-4 dark:border-border-dark">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange text-white"><Bot size={18} aria-hidden="true" /></span>
          <div className="min-w-0">
            <h2 id="chat-title" className="text-sm font-semibold">A guided first step</h2>
            <p id="chat-description" className="mt-0.5 text-xs leading-4 text-text-muted">Choose a question to explore our capabilities</p>
          </div>
        </div>
        <button ref={closeRef} onClick={onClose} aria-label="Close chat" className="shrink-0 rounded-lg p-2 text-text-muted transition-colors hover:bg-black/5 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/60 dark:hover:bg-white/5"><X size={18} aria-hidden="true" /></button>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
        {messages.map((message, i) => <div key={`${message.from}-${i}`} className={`max-w-[90%] break-words rounded-xl px-3 py-2 text-sm leading-5 ${message.from === 'user' ? 'self-end bg-orange text-white' : 'bg-cream-dark dark:bg-charcoal-light'}`}>{message.text}</div>)}
        {busy && <div className="self-start rounded-xl bg-cream-dark px-3 py-2 text-sm text-text-muted dark:bg-charcoal-light" aria-label="Preparing an answer">•••</div>}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      <div className="shrink-0 border-t border-border p-4 dark:border-border-dark">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">Explore a direction</p>
        <div className="grid max-h-56 gap-2 overflow-y-auto sm:grid-cols-2">
          {prompts.map((prompt) => <button type="button" key={prompt} onClick={() => onAsk(prompt)} disabled={busy} className="min-w-0 rounded-xl border border-border px-3 py-2.5 text-left text-xs leading-4 text-text-secondary transition-[border-color,background-color,color,opacity] hover:border-orange hover:bg-orange/5 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/60 disabled:cursor-wait disabled:opacity-50 dark:border-border-dark dark:hover:bg-white/5">{prompt}</button>)}
        </div>
      </div>
    </motion.div>}
  </AnimatePresence>;
}
