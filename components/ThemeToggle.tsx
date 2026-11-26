'use client';

import { useEffect, useRef, useState, type ReactNode, type SVGProps } from 'react';

type Theme = 'system' | 'light' | 'dark';
type IconProps = SVGProps<SVGSVGElement>;

const themes: Theme[] = ['light', 'dark', 'system'];
const labels: Record<Theme, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

function SunIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
    </svg>
  );
}

function SystemIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

const icons: Record<Theme, (props: IconProps) => ReactNode> = {
  light: SunIcon,
  dark: MoonIcon,
  system: SystemIcon,
};

function isTheme(value: string | null): value is Theme {
  return value === 'system' || value === 'light' || value === 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectedOptionRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!isOpen) return;

    selectedOptionRef.current?.focus();

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const CurrentIcon = icons[theme];

  return (
    <div ref={containerRef} className="fixed right-4 top-4 z-50">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        disabled={!mounted}
        aria-label="테마 선택"
        aria-expanded={isOpen}
        aria-controls="theme-picker"
        className="grid size-10 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-wait dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      >
        <CurrentIcon className="size-6" />
      </button>

      {isOpen && (
        <div
          id="theme-picker"
          role="group"
          aria-label="테마"
          className="absolute right-0 top-12 w-48 rounded-3xl border border-gray-200 bg-white p-3 shadow-xl shadow-black/10 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/30"
        >
          {themes.map((option) => {
            const Icon = icons[option];
            const isSelected = theme === option;

            return (
              <button
                key={option}
                ref={isSelected ? selectedOptionRef : undefined}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setTheme(option);
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                className="grid w-full grid-cols-[1rem_1.5rem_1fr] items-center gap-3 rounded-xl px-2 py-3 text-left text-base text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-blue-500 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <span aria-hidden="true" className={`mx-auto size-2 rounded-full ${isSelected ? 'bg-current' : 'bg-transparent'}`} />
                <Icon className="size-6" />
                <span>{labels[option]}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
