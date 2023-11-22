import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, doc, setDoc } from './config';


export const signupFunc = async (email, password) => {
  let result = null,
    error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    await sendEmailVerification(user, {
      url: process.env.NEXT_PUBLIC_URL,
      handleCodeInApp: true,
    });

    await setDoc(doc(auth, 'users', user.uid)), {}
    
  } catch (e) {
    error = e;
  }

  return { result, error };
};

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
