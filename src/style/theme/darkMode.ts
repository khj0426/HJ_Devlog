const lightTheme = {
  body: '#fff',
  text: '#495057',
  toggleBorder: '#d1d1d1',
  background: '#fff',
  codeblock: '#f6f8fa',
  backgroundPost: '#fff',
  blue: '#1976d2',
} as const;

export type lightThemeTypes = typeof lightTheme;

const darkTheme = {
  body: '#111827',
  text: '#fafafa',
  toggleBorder: '#6b8096',
  background: '#111827',
  codeblock: '#fafafa',
  backgroundPost: 'rgba(31, 46, 61,0.3)',
  blue: '#1976d2',
} as const;

export type darkThemeTypes = typeof darkTheme;

export { darkTheme, lightTheme };
