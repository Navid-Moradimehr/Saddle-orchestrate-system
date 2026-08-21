'use client';
import { useTheme } from '@/lib/theme-context';
import Link from 'next/link';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`border-t py-12 px-6 ${theme === 'dark' ? 'border-border-dark' : 'border-border'}`}>
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center gap-1 text-text-muted md:items-start">
          <div className="flex items-center gap-2">
            <span className="text-sm">© {new Date().getFullYear()} Saddle Orchestrate Systems</span>
            <span className="text-border dark:text-border-dark">—</span>
            <span className="text-sm">Human creativity × thoughtful systems</span>
          </div>
          <a href="mailto:saddleorchestratesystem@gmail.com" className="text-xs text-text-muted transition-colors hover:text-text-primary">saddleorchestratesystem@gmail.com</a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
          <Link href="/ai-seo-faq" className="hover:text-text-primary transition-colors">Studio FAQ</Link>
          <Link href="/terms-of-service" className="hover:text-text-primary transition-colors">Terms of Service</Link>
          <a href="#" className="hover:text-text-primary transition-colors">Twitter</a>
          <a href="#" className="hover:text-text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-text-primary transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
