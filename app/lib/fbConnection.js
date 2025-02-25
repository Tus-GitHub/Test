// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getDatabase , set, push, ref} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "test1-dc74c.firebaseapp.com",
  projectId: "test1-dc74c",
  storageBucket: "test1-dc74c.firebasestorage.app",
  messagingSenderId: "314676898082",
  appId: "1:314676898082:web:a7baebdceea79d4bf79d7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export {database, ref, set, push};