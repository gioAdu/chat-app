import '@/styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import PageProvider from '@/components/helpers/Themes/PageProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeadProvider } from '@/Context/HeadContext';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <HeadProvider>
      <QueryClientProvider client={queryClient}>
        <PageProvider>
          <Component {...pageProps} />
        </PageProvider>
      </QueryClientProvider>
    </HeadProvider>
  );
}
