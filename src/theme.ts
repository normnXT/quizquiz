import type { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode colors
          primary: { main: '#2196f3' },
          secondary: { main: '#00bcd4' },
          background: { default: '#ffffff', paper: '#f5f5f5' },
          text: { primary: '#333333', secondary: '#666666' },
        }
      : {
          // Dark mode colors
          primary: { main: '#90caf9' },
          secondary: { main: '#4dd0e1' },
          background: { default: '#303030', paper: '#424242' },
          text: { primary: '#ffffff', secondary: '#b0bec5' },
        }),
  },
  typography: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  },
});

export const lightTheme = createTheme(getTheme('light'));
export const darkTheme = createTheme(getTheme('dark'));