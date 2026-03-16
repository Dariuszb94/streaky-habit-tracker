import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/config';

/**
 * Register a new user with email and password
 */
export const registerUser = async (
  email: string,
  password: string,
): Promise<FirebaseUser> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
};

/**
 * Sign in user with email and password
 */
export const loginUser = async (
  email: string,
  password: string,
): Promise<FirebaseUser> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
};

/**
 * Sign out current user
 */
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};

/**
 * Listen to auth state changes
 */
export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
