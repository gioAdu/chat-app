import { ThemeProvider as PreferredThemeProvider } from 'next-themes';
import Head from 'next/head';
import MUIThemeProvider from './MUIThemeProvider';

const PageProvider = ({ children }) => (
  <PreferredThemeProvider>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <MUIThemeProvider>{children}</MUIThemeProvider>
  </PreferredThemeProvider>
);

export default PageProvider;
