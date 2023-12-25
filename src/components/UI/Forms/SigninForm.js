import { Alert, Box, Button, CircularProgress, Grid, Snackbar, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import RecoverModal from './RecoverModal';
import { useState } from 'react';

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
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

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
          helperText={passwordError ? 'Password should be at least 8 characters long' : ''}
          autoComplete="current-password"
        />
        {errorMsg && (
          <Typography sx={{ paddingTop: 1, textAlign: 'center', color: 'error.main' }}>
            {errorMsg}
          </Typography>
        )}
        <Box sx={{ position: 'relative' }}>
          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }} disabled={loading}>
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
          <Button onClick={() => setOpen(true)}>
            <Typography sx={{ color: 'primary.main', textTransform: 'none' }}>
              Forgot password?
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Typography component={'span'}>Don't have an account?</Typography>
          <Link href="/auth/signup">
            <Typography sx={{ textAlign: 'center', color: 'primary.main' }}>Sign Up now</Typography>
          </Link>
        </Grid>
      </Grid>

      <RecoverModal open={open} setOpen={setOpen} setSuccess={setSuccess}/>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SigninForm;
