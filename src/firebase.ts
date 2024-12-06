// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: String(import.meta.env.VITE_APP_FIREBASE_API_KEY),
  authDomain: String(import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_APP_FIREBASE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(import.meta.env.VITE_APP_FIREBASE_APP_ID)
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
