import { createTheme, css } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    lightBg: {
      light: '#f5f7fb',
      main: '#e6ebf5',
      light_2: '#fff',
      dark: '#fff',
      indigo: '#7269ef',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    lightBg: {
      light: '#303841',
      light_2: '#36404a',
      main: '#36404a',
      dark: '#262e35',
      indigo: '#7269ef',
    },
  },
});

export const globalStyles = css`
  :root {
    body {
      background-color: #fff;
      color: #121212;
    }
  }

  [data-theme='dark'] {
    body {
      background-color: #121212;
      color: #fff;
    }
  }
`;
