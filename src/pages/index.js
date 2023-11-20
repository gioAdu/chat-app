import Layout from '@/components/Layout';
import firebase_app from '@/components/helpers/firebase/config';
import { Box, CircularProgress } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(firebase_app);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user exists');
        //router.push('/auth/signin');
      } else {
        console.log('user does not exist');
      }
    });

    setLoading(false);
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress size={100} color="secondary" />
      </Box>
    );
  }

  return <Layout />;
}
