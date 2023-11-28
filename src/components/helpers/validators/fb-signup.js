export const getErrorText = (error) => {
  switch (error) {
    case 'auth/email-already-in-use':
      return 'The provided email is already in use by an existing user.';
    case 'auth/invalid-email':
    case 'auth/invalid-login-credentials':
      return 'The email or password you entered is invalid.';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed.';
    case 'auth/weak-password':
      return 'The password you entered is weak. Please choose a stronger password.';
    default:
      return 'An unknown error occurred.';
  }
};
