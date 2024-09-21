// src/theme.ts
import type { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    chart: {
      correct: string;
      incorrect: string;
      total: string;
    };
  }
  interface PaletteOptions {
    chart?: {
      correct?: string;
      incorrect?: string;
      total?: string;
    };
  }
}

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
          chart: {
            correct: '#80ef80',
            incorrect: '#FF746C',
            total: '#b3ebf2',
          },
        }
      : {
          // Dark mode colors
          primary: { main: '#90caf9' },
          secondary: { main: '#4dd0e1' },
          background: { default: '#303030', paper: '#424242' },
          text: { primary: '#ffffff', secondary: '#b0bec5' },
          chart: {
            correct: '#80ef80',
            incorrect: '#FF746C',
            total: '#b3ebf2',
          },
        }),
  },
  typography: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  },
});

export const lightTheme = createTheme(getTheme('light'));
export const darkTheme = createTheme(getTheme('dark'));