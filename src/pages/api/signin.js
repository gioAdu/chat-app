import {
  validateEmail,
  validatePassword,
} from '@/components/helpers/validateForm';

const signinHandler = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError || passwordError) {
   return res.status(400).json({ emailError, passwordError });
  }

  return res.status(200).json({ message: 'success' });
};

export default signinHandler;
