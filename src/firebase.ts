// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAoLyRV_WwSRCuTdmzZeKUQy-QhUdRXsRg",
  authDomain: "react-iam-dashboard.firebaseapp.com",
  projectId: "react-iam-dashboard",
  storageBucket: "react-iam-dashboard.firebasestorage.app",
  messagingSenderId: "686008234967",
  appId: "1:686008234967:web:9b1205701d5b21e3745192"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export default app;
