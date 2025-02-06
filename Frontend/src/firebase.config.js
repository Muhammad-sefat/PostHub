// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHJDFrxEZeCXO8suWJB23odMksQBKRJbA",
  authDomain: "posthub-8e99f.firebaseapp.com",
  projectId: "posthub-8e99f",
  storageBucket: "posthub-8e99f.firebasestorage.app",
  messagingSenderId: "102303638348",
  appId: "1:102303638348:web:98208e712bcd155dd225e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
