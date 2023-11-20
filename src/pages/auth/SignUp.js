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
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useState } from 'react';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateRepeatPassword,
  validateSurname,
} from '@/components/helpers/validateForm';

const SignUp = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);

  const [surname, setSurname] = useState('');
  const [surnameError, setSurnameError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const surnameError = validateSurname(surname);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const repeatPasswordError = validateRepeatPassword(
      password,
      repeatPassword
    );

    setNameError(nameError);
    setSurnameError(surnameError);
    setEmailError(emailError);
    setPasswordError(passwordError);
    setRepeatPasswordError(repeatPasswordError);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton
            aria-label={`switch to ${
              resolvedTheme === 'light' ? 'dark' : 'light'
            } mode`}
            onClick={() =>
              setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
            }
          >
            {resolvedTheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError ? 'Field cannot be empty' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="surname"
                label="Last Name"
                name="surname"
                autoComplete="family-name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                error={surnameError}
                helperText={surnameError ? 'Field cannot be empty' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={
                  emailError ? 'Please enter a valid email address' : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={
                  passwordError
                    ? 'Password should be at least 8 characters long'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="repeatPassword"
                label="Repeat Password"
                name="repeatPassword"
                type="password"
                autoComplete="new-password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                error={repeatPasswordError}
                helperText={
                  repeatPasswordError ? 'Passwords should match!' : ''
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClick}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component={'span'}>
                Already have an account?
              </Typography>
              <Link href="/auth/signin">
                <Typography sx={{ textAlign: 'center', color: 'primary.main' }}>
                  Sign in now
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
