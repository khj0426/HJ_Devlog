'use client';

import { useEffect, useState } from 'react';

type Theme = 'system' | 'light' | 'dark';

const themes: Theme[] = ['system', 'light', 'dark'];
const labels: Record<Theme, string> = {
  system: '시스템',
  light: '라이트',
  dark: '다크',
};
const icons: Record<Theme, string> = {
  system: '◐',
  light: '☀',
  dark: '☾',
};

function isTheme(value: string | null): value is Theme {
  return value === 'system' || value === 'light' || value === 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(isTheme(storedTheme) ? storedTheme : 'system');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    };

    localStorage.setItem('theme', theme);
    applyTheme();

    if (theme === 'system') mediaQuery.addEventListener('change', applyTheme);
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, [mounted, theme]);

  const selectNextTheme = () => {
    const currentIndex = themes.indexOf(theme);
    setTheme(themes[(currentIndex + 1) % themes.length]);
  };

  return (
    <button
      type="button"
      onClick={selectNextTheme}
      disabled={!mounted}
      aria-label={`현재 ${labels[theme]} 테마. 다음 테마로 변경`}
      className="fixed right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-3 py-2 text-sm text-gray-600 shadow-sm backdrop-blur-sm transition-colors hover:text-blue-500 disabled:cursor-wait dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:text-blue-400"
    >
      <span aria-hidden="true">{icons[theme]}</span>
      <span>{labels[theme]}</span>
    </button>
  );
}
