import { useTheme } from 'next-themes';
import { GlobalStyles } from '@mui/material';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, globalStyles, lightTheme } from './Theme';
import { useEffect, useState } from 'react';

const MUIThemeProvider = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    resolvedTheme === 'light' ? setCurrentTheme(lightTheme) : setCurrentTheme(darkTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {isMounted && children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
