import '@/styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import PageProvider from '@/components/helpers/PageProvider';

export default function App({ Component, pageProps }) {
  return (
    <PageProvider>
      <Component {...pageProps} />
    </PageProvider>
  );
}
