import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms for using the Saddle Orchestrate Systems website and contacting the studio',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-cream px-6 py-12 text-text-primary dark:bg-charcoal dark:text-white sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.18em] text-orange hover:underline">← Back to the platform</Link>
        <p className="mt-20 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">Saddle Orchestrate Systems</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Terms of Service</h1>
        <p className="mt-6 text-lg leading-8 text-text-secondary">These terms describe the simple rules for using this website and starting a conversation with our studio.</p>
        <div className="mt-14 space-y-10 border-t border-border pt-10 dark:border-border-dark">
          <section><h2 className="text-xl font-semibold">Website content</h2><p className="mt-3 leading-7 text-text-secondary">The examples, descriptions, visuals, and demonstrations on this site are provided for general information. They may change as our work evolves and should not be treated as a guarantee of a particular outcome.</p></section>
          <section><h2 className="text-xl font-semibold">Use of the site</h2><p className="mt-3 leading-7 text-text-secondary">Please use the site lawfully and do not attempt to disrupt, scrape, reverse-engineer, or misuse its interactive features.</p></section>
          <section><h2 className="text-xl font-semibold">Project conversations</h2><p className="mt-3 leading-7 text-text-secondary">A message, chatbot conversation, or email is an initial discussion, not a contract or a commitment to deliver services. Any engagement will be defined in a separate written agreement.</p></section>
          <section><h2 className="text-xl font-semibold">Contact</h2><p className="mt-3 leading-7 text-text-secondary">Questions about these terms or a potential project can be sent to <a className="text-orange hover:underline" href="mailto:saddleorchestratesystem@gmail.com">saddleorchestratesystem@gmail.com</a>.</p></section>
        </div>
        <p className="mt-14 font-mono text-xs text-text-muted">Last updated August 17, 2026</p>
      </div>
    </main>
  );
}
