// Import the functions you need from the SDKs you need
//access realtime database
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
//authorisation
import { getAuth } from "firebase/auth";

//API config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL:
    "https://workhack-1b86b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
//initialize realtime database
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

//authorisation
export const auth = getAuth();
