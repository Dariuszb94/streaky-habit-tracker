import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Copy this file to config.ts and replace with your actual Firebase configuration
// Get this from Firebase Console -> Project Settings -> General -> Your apps
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-project-id.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project-id.firebasestorage.app',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
