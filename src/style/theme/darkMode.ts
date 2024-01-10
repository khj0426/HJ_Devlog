const lightTheme = {
  body: '#eaeaea',
  text: '#1c1e21',
  toggleBorder: '#d1d1d1',
  background: '#EEEEEE',
  codeblock: '#f6f8fa',
  backgroundPost: '#E4E6E8',
  blue: '#1976d2',
} as const;

const darkTheme = {
  body: '#2f3136',
  text: '#fafafa',
  toggleBorder: '#6b8096',
  background: '#363537',
  codeblock: '#fafafa',
  backgroundPost: 'rgba(31, 46, 61,0.3)',
  blue: '#1976d2',
} as const;

export { darkTheme, lightTheme };
