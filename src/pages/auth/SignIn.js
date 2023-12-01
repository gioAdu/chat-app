import { useTheme } from 'next-themes';
import { Box, Container, IconButton, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useLayoutEffect, useState } from 'react';

import { signinFunc } from '@/components/firebase/Auth';
import { validateEmail, validatePassword } from '@/components/helpers/validators/validateForm';
import withAuthProtection from '@/components/helpers/validators/authChecker';
import { getErrorText } from '@/components/helpers/validators/fb-signup';
import SigninForm from '@/components/UI/Forms/SigninForm';
import { usePageHead } from '@/Context/HeadContext';

const SignIn = () => {
  const { setTitle, setDescription } = usePageHead();

  useLayoutEffect(() => {
    setTitle('Sign Up and Connect');
    setDescription(
      'Ready to dive into endless conversations? Sign up now and connect with friends, family, and colleagues instantly.'
    ),
      [];
  });

  const { resolvedTheme, setTheme } = useTheme();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!loading) {
      setLoading(true);

      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);

      setEmailError(emailError);
      setPasswordError(passwordError);

      if (emailError || passwordError) {
        setLoading(false);
        return;
      }

      const { result, error } = await signinFunc(email, password);
      setLoading(false);

      if (error) {
        setErrorMsg(getErrorText(error.code));
        return;
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 15 }}>
      <Typography component={'h1'} variant="h4" textAlign={'center'}>
        Sign in
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          aria-label={`switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
          onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
          {resolvedTheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>

      <SigninForm
        email={email}
        setEmail={setEmail}
        emailError={emailError}
        setEmailError={setEmailError}
        password={password}
        setPassword={setPassword}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        errorMsg={errorMsg}
        loading={loading}
        handleClick={handleClick}
      />
    </Container>
  );
};

export default withAuthProtection(SignIn, false);
