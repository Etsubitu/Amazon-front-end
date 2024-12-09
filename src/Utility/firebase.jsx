// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHQKW2uA0s5QI7ICtZqWHZzzHsL-ixiSc",
  authDomain: "clone-4ab91.firebaseapp.com",
  projectId: "clone-4ab91",
  storageBucket: "clone-4ab91.firebasestorage.app",
  messagingSenderId: "604333890929",
  appId: "1:604333890929:web:4c62f6f7f9094a4016ead0",
  measurementId: "G-K04BTHCQT8",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = firebase.firestore();
const analytics = getAnalytics(app);
