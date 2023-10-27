import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const SignUp = () => {
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid item display={'flex'} justifyContent={'center'} gap={2}>
            <Typography component={'span'}>Already have an account?</Typography>
            <Link
              href="/auth/signin"
              variant="body2"
              sx={{ textAlign: 'center', color: 'primary.main' }}
            >
              <Typography sx={{ textAlign: 'center', color: 'primary.main' }}>
                Log in
              </Typography>
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
