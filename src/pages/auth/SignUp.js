import { Container } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateRepeatPassword,
  validateSurname,
} from '@/components/helpers/validators/validateForm';
import { signupFunc } from '@/components/firebase/Auth';
import withAuthProtection from '@/components/helpers/validators/authChecker';
import { getErrorText } from '@/components/helpers/validators/fb-signup';
import SignupForm from '@/components/UI/Forms/SignupForm';
import { useCtx } from '@/Context/AppContext';

const SignUp = () => {
  const { setTitle, setDescription } = useCtx();

  useLayoutEffect(() => {
    setTitle('Sign Up and Connect');
    setDescription(
      'Ready to dive into endless conversations? Sign up now and connect with friends, family, and colleagues instantly.'
    );
  }, []);

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);

  const [surname, setSurname] = useState('');
  const [surnameError, setSurnameError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleClick = async (e) => {
    e.preventDefault();

    setLoading(true);

    const nameError = validateName(firstName);
    const surnameError = validateSurname(surname);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const repeatPasswordError = validateRepeatPassword(password, repeatPassword);

    setFirstNameError(firstNameError);
    setSurnameError(surnameError);
    setEmailError(emailError);
    setPasswordError(passwordError);
    setRepeatPasswordError(repeatPasswordError);

    if (nameError || surnameError || emailError || passwordError || repeatPasswordError) {
      setLoading(false);
      return;
    }

    const fullName = `${firstName} ${surname}`;

    const { error } = await signupFunc(email, password, fullName);

    setLoading(false);

    if (error) {
      console.log(error);
      const errMsg = getErrorText(error.code);
      setErrorMsg(errMsg);
      return;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <SignupForm
        firstName={firstName}
        setFirstName={setFirstName}
        firstNameError={firstNameError}
        setFirstNameError={setFirstNameError}
        surname={surname}
        setSurname={setSurname}
        surnameError={surnameError}
        setSurnameError={setSurnameError}
        email={email}
        setEmail={setEmail}
        emailError={emailError}
        setEmailError={setEmailError}
        password={password}
        setPassword={setPassword}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        repeatPassword={repeatPassword}
        setRepeatPassword={setRepeatPassword}
        repeatPasswordError={repeatPasswordError}
        setRepeatPasswordError={setRepeatPasswordError}
        loading={loading}
        errorMsg={errorMsg}
        handleClick={handleClick}
      />
    </Container>
  );
};

export default withAuthProtection(SignUp, false);
