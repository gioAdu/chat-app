import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePageHead } from '@/Context/HeadContext';

export default function Custom404() {
  const router = useRouter();

  const { setTitle, setDescription } = usePageHead();
  setTitle('Oops! Page Not Found');
  setDescription(
    'We couldn’t find the page you were looking for. Please check the URL or return to the homepage'
  );

  useEffect(() => {
    router.replace('/');
  }, []);

  return null;
}
