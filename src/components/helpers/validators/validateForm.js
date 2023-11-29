/**
 * Validates a name by checking if it is empty or consists only of whitespace.
 * @param {string} name - The name to be validated.
 * @returns {boolean} - Returns true if the name is empty or consists only of whitespace, otherwise returns false.
 */
export const validateName = (name) => {
  return name.trim().length === 0;
};

/**
 * Validates the surname field.
 * @param {string} surname - The surname to be validated.
 * @returns {boolean} - Returns true if the surname is empty or contains only whitespace, otherwise returns false.
 */
export const validateSurname = (surname) => {
  return surname.trim().length === 0;
};

/**
 * Validates an email address.
 * @param {string} email - The email address to be validated.
 * @returns {boolean} - Returns true if the email address is valid, false otherwise.
 */
export const validateEmail = (email) => {
  return !email.includes('@');
};

/**
 * Validates the password length.
 * @param {string} password - The password to be validated.
 * @returns {boolean} - True if the password length is less than 8, false otherwise.
 */
export const validatePassword = (password) => {
  return password.length < 8;
};

/**
 * Validates if the repeat password matches the original password and if the password length is at least 8 characters.
 * @param {string} password - The original password.
 * @param {string} repeatPassword - The repeated password.
 * @returns {boolean} - Returns true if the repeat password is invalid, false otherwise.
 */
export const validateRepeatPassword = (password, repeatPassword) => {
  return password !== repeatPassword || password.length < 8;
};
