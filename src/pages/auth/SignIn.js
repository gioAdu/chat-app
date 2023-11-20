import { useTheme } from 'next-themes';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SignIn = () => {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    console.log('test');
    const emailVal = email.trim();
    const passwordVal = password.trim();

    if (!emailVal.includes('@') || emailVal.length < 6) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    if (passwordVal.length < 8) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    router.push('/');
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 15 }}>
      <Typography component={'h1'} variant="h4" textAlign={'center'}>
        Sign in
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          aria-label={`switch to ${
            resolvedTheme === 'light' ? 'dark' : 'light'
          } mode`}
          onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
          {resolvedTheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>

      <Box component="form" onSubmit={handleClick} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          type="email"
          error={emailError}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          helperText={emailError ? 'Please enter a valid email address' : ''}
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
          value={password}
          error={passwordError}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          helperText={
            passwordError ? 'Password should be at least 8 characters long' : ''
          }
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
