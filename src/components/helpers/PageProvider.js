import { ThemeProvider as PreferredThemeProvider } from 'next-themes';
import Head from 'next/head';
import MUIThemeProvider from './MUIThemeProvider';
import createEmotionCache from './createEmotionCache';
import { CacheProvider } from '@emotion/react';

const clientSideEmotionCache = createEmotionCache();

const PageProvider = ({ children, emotionCache = clientSideEmotionCache }) => (
  <PreferredThemeProvider>
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </CacheProvider>
  </PreferredThemeProvider>
)

export default PageProvider;
