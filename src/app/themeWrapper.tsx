'use client';

import { darkTheme, lightTheme } from '@/style/theme/darkMode';
import StyledComponentsRegistry from './registry';
import { ThemeProvider } from 'styled-components';
import { useRecoilState } from 'recoil';
import { themeState } from './globalAtom';
import mediatheme from '@/style/theme/media';
export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);
  const themeObj = currentTheme === 'light' ? lightTheme : darkTheme;
  const theme = { ...themeObj, ...mediatheme };
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}
