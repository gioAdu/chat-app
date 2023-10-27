import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignIn = () => {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();

    router.push('/');
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 15 }}>
      <Typography component={'h1'} variant="h4" textAlign={'center'}>
        Sign in
      </Typography>
      <Box component="form" onClick={handleClick} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          //   error={true}
          //   helperText={'wrong password'}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          //   error={true}
          //   helperText={'wrong password'}
          autoComplete="current-password"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
          Log in
        </Button>
      </Box>
      <Grid container>
        <Grid item xs>
          <Link href="/auth/recover">
            <Typography sx={{ color: 'primary.main' }}>
              Forgot password?
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Typography component={'span'}>Don't have an account?</Typography>
          <Link href="/auth/signup">
            <Typography sx={{ textAlign: 'center', color: 'primary.main' }}>
              Sign Up now
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
