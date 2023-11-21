export const validateName = (name) => {
  return name.trim().length === 0;
};

export const validateSurname = (surname) => {
  return surname.trim().length === 0;
};

export const validateEmail = (email) => {
  return !email.includes('@');
};

export const validatePassword = (password) => {
  return password.length < 8;
};

export const validateRepeatPassword = (password, repeatPassword) => {
  return password !== repeatPassword || password.length < 8;
};
