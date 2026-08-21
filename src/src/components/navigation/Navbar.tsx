'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import LogoMark from './LogoMark';

const navLinks = [
  { label: 'Work', href: '#services' },
  { label: 'Process', href: '#workflow' },
  { label: 'Lab', href: '#laboratory' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { theme, visualMode } = useTheme();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1));
    const initialHash = window.location.hash.slice(1);
    if (sections.includes(initialHash)) queueMicrotask(() => setActiveSection(initialHash));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.target.id)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-24% 0px -56% 0px', threshold: [0, 0.15, 0.35, 0.6] }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.slice(1);
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      window.history.pushState({}, '', href);
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
  }, [reducedMotion]);

  const navbarBg = scrolled
    ? theme === 'dark' ? 'bg-charcoal/90 backdrop-blur-lg border-b border-border-dark' : 'bg-cream/90 backdrop-blur-lg border-b border-border'
    : 'bg-transparent';
  const onHero = !scrolled;
  const foreground = onHero ? 'text-white' : 'text-text-primary';
  const secondaryForeground = onHero ? 'text-white/80 hover:text-white' : 'text-text-secondary hover:text-text-primary';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${foreground} ${navbarBg}`}>
      <nav className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between" role="navigation" aria-label="Main navigation">
        <a href="#" className="group flex min-w-0 items-center gap-2 sm:gap-3" aria-label="Home">
          <LogoMark />
          <span className="min-w-0 max-w-[calc(100vw-7rem)] truncate text-sm font-semibold tracking-tight sm:max-w-none sm:text-lg">
            Saddle Orchestrate Systems
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-orange'
                    : secondaryForeground
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </a>
            </li>
          ))}
          <li className="ml-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-dark"
            >
            Start a project
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          ref={menuButtonRef}
          className={`flex-none rounded-lg p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5 md:hidden ${onHero && !mobileOpen ? 'text-white hover:bg-white/10' : 'text-text-primary'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            id="mobile-navigation"
            className="overflow-hidden border-t border-border bg-cream/95 backdrop-blur-lg dark:border-border-dark dark:bg-charcoal/95 md:hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      activeSection === link.href.slice(1)
                        ? 'text-orange bg-orange/5'
                        : 'text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="block rounded-lg bg-orange px-4 py-3 text-center text-base font-semibold text-white"
                >
                  Start a project
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
