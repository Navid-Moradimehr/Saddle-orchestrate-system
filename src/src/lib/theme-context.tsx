'use client';
import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

export type VisualMode = 'human' | 'system' | 'combined';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (t: 'light' | 'dark') => void;
  visualMode: VisualMode;
  setVisualMode: (m: VisualMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  visualMode: 'human',
  setVisualMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Keep the first render identical on the server and client. Browser storage
  // is applied after hydration so persisted preferences never change HTML
  // attributes while React is attaching event handlers.
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [visualMode, setVisualModeState] = useState<VisualMode>('human');
  const [hydrated, setHydrated] = useState(false);
  const interactionRef = useRef(false);

  const applyThemeToDocument = useCallback((nextTheme: 'light' | 'dark') => {
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nextTheme === 'dark' ? '#0B1220' : '#FAF7F2');
    localStorage.setItem('theme', nextTheme);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const nextTheme = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const savedMode = localStorage.getItem('visualMode');
    const nextMode = savedMode === 'human' || savedMode === 'system' || savedMode === 'combined' ? savedMode : 'human';
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      if (interactionRef.current) {
        setHydrated(true);
        return;
      }
      setThemeState(nextTheme);
      setVisualModeState(nextMode);
      setHydrated(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    applyThemeToDocument(theme);
  }, [applyThemeToDocument, hydrated, theme]);

  const setTheme = useCallback((t: 'light' | 'dark') => {
    interactionRef.current = true;
    setThemeState(t);
    if (typeof window !== 'undefined') applyThemeToDocument(t);
  }, [applyThemeToDocument]);

  const toggleTheme = useCallback(() => {
    interactionRef.current = true;
    setThemeState(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') applyThemeToDocument(next);
      return next;
    });
  }, [applyThemeToDocument]);

  const setVisualMode = useCallback((m: VisualMode) => {
    setVisualModeState(m);
    localStorage.setItem('visualMode', m);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, visualMode, setVisualMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
