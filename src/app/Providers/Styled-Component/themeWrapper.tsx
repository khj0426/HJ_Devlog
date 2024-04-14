'use client';

import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '@/style/theme/darkMode';
import deviceTheme from '@/style/theme/media';
import { fontSizes, fontWeights, borderRadius } from '@/style/theme/size';

import { themeAtom } from '../Recoil/globalAtom';

import StyledComponentsRegistry from './registry';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const currentTheme = useRecoilValue(themeAtom);
  const themeObj = currentTheme === 'light' ? lightTheme : darkTheme;
  const sizes = { fontSizes, fontWeights, borderRadius };
  return (
    <StyledComponentsRegistry>
      <ThemeProvider
        theme={{
          currentTheme: themeObj,
          device: deviceTheme,
          fontSize: sizes.fontSizes,
          fontWeight: sizes.fontWeights,
          borderRadius: sizes.borderRadius,
        }}
      >
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
