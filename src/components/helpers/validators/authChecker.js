import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';
import { Box, CircularProgress } from '@mui/material';

function withAuthProtection(WrappedComponent, shouldBeAuthenticated) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      return auth.onAuthStateChanged((user) => {
        if (shouldBeAuthenticated && !user) {
          console.log('user is logged out');
          return router.push('/auth/signin');
        } else if (!shouldBeAuthenticated && user) {
          console.log('user is logged in');
          return router.push('/');
        }
        setLoading(false);
      });
    }, [shouldBeAuthenticated, router]);

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

    return <WrappedComponent {...props} />;
  };
}

export default withAuthProtection;
