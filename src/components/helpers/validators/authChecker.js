import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';
import { Box, CircularProgress } from '@mui/material';

/**
 * A higher-order function that adds authentication protection to a component.
 *
 * @param {React.Component} WrappedComponent - The component to be protected.
 * @param {boolean} shouldBeAuthenticated - Indicates whether the component should be accessible only to authenticated users.
 * @returns {React.Component} - The protected component.
 */
function withAuthProtection(WrappedComponent, shouldBeAuthenticated) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      return auth.onAuthStateChanged((user) => {
        if (shouldBeAuthenticated && !user) {
          return router.push('/auth/signin');
        } else if (!shouldBeAuthenticated && user) {
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
            height: '100dvh',
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
