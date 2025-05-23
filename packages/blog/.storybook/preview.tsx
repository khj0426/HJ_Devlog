import React from "react";
import type { Preview } from "@storybook/react";

import { RecoilRoot, useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../src/style/theme/darkMode";

import { buttonTheme } from "../src/style/theme/button";
import { themeAtom } from "../src/app/Providers/Recoil/globalAtom";
import { fontSizes, fontWeights, borderRadius } from "../src/style/theme/size";

import deviceTheme from "../src/style/theme/media";
const ThemeWrapper = ({ children }) => {
  const currentTheme = useRecoilValue(themeAtom);
  const themeObj = currentTheme === "light" ? lightTheme : darkTheme;

  const sizes = { fontSizes, fontWeights, borderRadius };

  return (
    <ThemeProvider
      theme={{
        buttonTheme: buttonTheme,
        currentTheme: themeObj,
        device: deviceTheme,
        fontSize: sizes.fontSizes,
        fontWeight: sizes.fontWeights,
        borderRadius: sizes.borderRadius,
      }}
    >
      <div id="modal"></div>
      {children}
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <div id="drawer"></div>
          <ThemeWrapper>
            <Story />
          </ThemeWrapper>
        </RecoilRoot>
      );
    },
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        laptop: {
          name: "Laptop Medium",
          styles: {
            width: "1024px",
            height: "768px",
          },
          type: "desktop",
        },
        desktop: {
          name: "Desktop Large",
          styles: {
            width: "1280px",
            height: "1024px",
          },
          type: "desktop",
        },
        desktopXL: {
          name: "Desktop Extra Large",
          styles: {
            width: "1440px",
            height: "900px",
          },
          type: "desktop",
        },
        mobile1: {
          name: "iPhone 13 mini",
          styles: {
            width: "375px",
            height: "812px",
          },
          type: "mobile",
        },
        mobile2: {
          name: "iPhone 13 / 13 pro",
          styles: {
            width: "390px",
            height: "844px",
          },
          type: "mobile",
        },
        tablet1: {
          name: 'iPad Pro 11"',
          styles: {
            width: "834px",
            height: "1194px",
          },
          type: "tablet",
        },
      },
      defaultViewport: "mobile1",
    },
  },
};

export default preview;
