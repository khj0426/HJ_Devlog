"use client";

import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";

import {
  lightTheme,
  darkTheme,
} from "@hj-devlog/shared/src/style/theme/darkMode";
import device from "@hj-devlog/shared/src/style/theme/media";
import {
  fontSizes,
  fontWeights,
  borderRadius,
} from "@hj-devlog/shared/src/style/theme/size";

import { themeAtom } from "../Recoil/globalAtom";

import StyledComponentsRegistry from "./registry";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const currentTheme = useRecoilValue(themeAtom);
  const themeObj = currentTheme === "light" ? lightTheme : darkTheme;
  const sizes = { fontSizes, fontWeights, borderRadius };
  return (
    <StyledComponentsRegistry>
      <ThemeProvider
        theme={{
          currentTheme: themeObj,
          device: device,
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
