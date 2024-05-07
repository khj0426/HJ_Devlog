const buttonTheme = {
  variant_backgroundColor: {
    blue: 'rgb(3, 111, 227)',
    secondary: ' #1ea7fd',
    warning: '#b12d00',
    positive: '#008539',
    negative: '#ffffff',
    transparent: '#ffffff',
    dark_blue: 'rgb(3,91,207)',
    light_blue: '#CEECFF',
    light_red: '#ffe0e0',
    light_green: '#cdf3c6',
    light_orange: '#f5e5c0',
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
