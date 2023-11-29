import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const SigninForm = ({
  handleClick,
  emailError,
  setEmail,
  email,
  password,
  passwordError,
  setPassword,
  errorMsg,
  loading,
}) => {
  return (
    <>
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
        {errorMsg && (
          <Typography
            sx={{ paddingTop: 1, textAlign: 'center', color: 'error.main' }}
          >
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
            Log in
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
    </>
  );
};

export default SigninForm;
