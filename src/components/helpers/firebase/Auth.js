import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import firebase_app from './config';

export const signupFunc = async (email, password) => {
  const auth = getAuth(firebase_app);
  let result = null,
    error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export const signinFunc = async (email, password) => {
  const auth = getAuth(firebase_app);
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export const logoutFunc = async () => {
  const auth = getAuth(firebase_app);
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
