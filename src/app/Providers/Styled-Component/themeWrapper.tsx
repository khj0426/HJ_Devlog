'use client';

import { useRecoilState } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '@/style/theme/darkMode';
import mediatheme from '@/style/theme/media';

import { themeAtom } from '../Recoil/globalAtom';

import StyledComponentsRegistry from './registry';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeAtom);
  const themeObj = currentTheme === 'light' ? lightTheme : darkTheme;
  const theme = { ...themeObj, ...mediatheme };
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}
