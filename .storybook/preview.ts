import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';

import { ThemeProvider } from 'styled-components';
import globalStyle from '../src/style/globalStyle';
import { darkTheme, lightTheme } from '../src/style/theme/darkMode';
const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider({
      GlobalStyles: globalStyle,
      themes: {
        darkTheme,
        lightTheme,
      },
      Provider: ThemeProvider,
    }),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile1: {
          name: 'iPhone 13 mini',
          styles: {
            width: '375px',
            height: '812px',
          },
          type: 'mobile',
        },
        mobile2: {
          name: 'iPhone 13 / 13 pro',
          styles: {
            width: '390px',
            height: '844px',
          },
          type: 'mobile',
        },
        tablet1: {
          name: 'iPad Pro 11"',
          styles: {
            width: '834px',
            height: '1194px',
          },
          type: 'tablet',
        },
      },
      defaultViewport: 'mobile1',
    },
  },
};

export default preview;
