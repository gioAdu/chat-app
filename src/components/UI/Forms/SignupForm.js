import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const SignupForm = ({
  firstName,
  setFirstName,
  firstNameError,
  surname,
  setSurname,
  surnameError,
  email,
  setEmail,
  emailError,
  password,
  setPassword,
  passwordError,
  repeatPassword,
  setRepeatPassword,
  repeatPasswordError,
  loading,
  errorMsg,
  handleClick,
}) => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
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
          aria-label={`switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
          onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
          {resolvedTheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>

      <Box component="form" onSubmit={handleClick} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={firstNameError}
              helperText={firstNameError ? 'Field cannot be empty' : ''}
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
              helperText={emailError ? 'Please enter a valid email address' : ''}
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
                passwordError ? 'Password should be at least 8 characters long' : ''
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
              helperText={repeatPasswordError ? 'Passwords should match!' : ''}
            />
          </Grid>
        </Grid>
        {errorMsg && (
          <Typography sx={{ paddingTop: 2, textAlign: 'center', color: 'error.main' }}>
            {errorMsg}
          </Typography>
        )}
        <Box sx={{ position: 'relative' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 2 }}
            disabled={loading}
          >
            Sign Up
          </Button>
          {loading && (
            <CircularProgress
              size={28}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-13px',
                marginLeft: '-13px',
              }}
            />
          )}
        </Box>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography component={'span'}>Already have an account?</Typography>
            <Link href="/auth/signin">
              <Typography sx={{ textAlign: 'center', color: 'primary.main' }}>
                Sign in now
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignupForm;
