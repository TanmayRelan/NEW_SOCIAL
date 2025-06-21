// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIRf15_r9AfH41pyZqdlnRx0M2bBwnuf8",
  authDomain: "social-media-app-caf99.firebaseapp.com",
  projectId: "social-media-app-caf99",
  storageBucket: "social-media-app-caf99.appspot.com",
  messagingSenderId: "753467669021",
  appId: "1:753467669021:web:fea476511f21548ea264f4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);