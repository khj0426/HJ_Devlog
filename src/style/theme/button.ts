const buttonTheme = {
  variant_backgroundColor: {
    blue: 'rgb(3, 111, 227)',
    secondary: ' #1ea7fd',
    positive: '#008539',
    negative: '#ffffff',
    transparent: '#ffffff',
    dark_blue: 'rgb(3,91,207)',
  },
  variant_color: {
    white: '#ffffff',
    secondary: '#111b2b',
    negative: '#bd002a',
    dark_white: 'f2f2f2',
  },

  border_color: {
    gray: '#cfd9e0',
  },
} as const;

export type buttonThemeType = typeof buttonTheme;

export { buttonTheme };
