import { EmailAuthProvider } from 'firebase/auth';

/**
 * Returns the user credentials based on the provided email and password.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Object} - The user credentials.
 */
export const getCredentials = (email, password) => {
  const credential = EmailAuthProvider.credential(email, password);

  return credential;
};
