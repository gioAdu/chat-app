import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from './config';
import { setDoc, doc } from 'firebase/firestore';

/**
 * Sign up a user with the provided email, password, and full name.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {string} fullName - The full name of the user.
 * @returns {Promise<{result: any, error: any}>} - A promise that resolves to an object containing the result and error.
 */
export const signupFunc = async (email, password, fullName) => {
  let result = null,
    error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: fullName });

    const user = auth.currentUser;
    await sendEmailVerification(user, {
      url: process.env.NEXT_PUBLIC_URL,
      handleCodeInApp: true,
    });

    await setDoc(doc(db, 'Users', user.uid), {
      email: user.email,
      uid: user.uid,
      displayName: fullName,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
};

/**
 * Sign in function that authenticates a user with the provided email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<{result: any, error: any}>} - A promise that resolves to an object containing the result and error.
 */
export const signinFunc = async (email, password) => {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

/**
 * Logs out the user.
 * @returns {Promise<{result: string, error: any}>} The result and error of the logout operation.
 */
export const logoutFunc = async () => {
  let result = null,
    error = null;
  try {
    await signOut(auth);
    result = 'Logout successful';
  } catch (e) {
    error = e;
  }

  return { result, error };
};
