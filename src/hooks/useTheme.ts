import { useCallback, useState } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return {
    theme,
    toggleTheme,
  };
}
