'use client';

import { darkTheme, lightTheme } from '@/style/theme/darkMode';
import StyledComponentsRegistry from './registry';
import { ThemeProvider } from 'styled-components';
import { useRecoilState } from 'recoil';
import { themeState } from './globalAtom';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);
  const themeObj = currentTheme === 'light' ? lightTheme : darkTheme;
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={themeObj}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}
