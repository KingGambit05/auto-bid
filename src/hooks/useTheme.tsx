/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const saved = typeof window !== 'undefined' ? localStorage.getItem('auto_bid_theme') : null;
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      setThemeState(saved as Theme);
    } else {
      setThemeState('system');
    }
  }, []);

  useEffect(() => {
    const apply = (t: Theme) => {
      let dark = false;
      if (t === 'system') {
        dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        dark = t === 'dark';
      }

      setIsDark(dark);

      const root = document.documentElement;
      if (dark) root.classList.add('dark'); else root.classList.remove('dark');
    };

    apply(theme);

    // If using system, listen for changes
    if (theme === 'system' && typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => apply('system');
      if (mq.addEventListener) mq.addEventListener('change', handler);
      else (mq as any).addListener(handler);

      return () => {
        if (mq.removeEventListener) mq.removeEventListener('change', handler);
        else (mq as any).removeListener(handler);
      };
    }
    // no cleanup needed when not system
    return undefined;
  }, [theme]);

  const setTheme = (t: Theme) => {
    // Persist and apply; the effect watching `theme` will apply the class
    if (typeof window !== 'undefined') {
      localStorage.setItem('auto_bid_theme', t);
    }
    setThemeState(t);
  };

  const toggle = () => {
    setThemeState((prev) => {
      // If currently following system, toggle to the opposite of the effective system theme
      let next: Theme;
      if (prev === 'system') {
        const systemDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        next = systemDark ? 'light' : 'dark';
      } else {
        next = prev === 'dark' ? 'light' : 'dark';
      }
      if (typeof window !== 'undefined') localStorage.setItem('auto_bid_theme', next);
      return next as Theme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export default ThemeProvider;
