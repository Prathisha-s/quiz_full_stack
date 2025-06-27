// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'; // ✅ Add this

const firebaseConfig = {
  apiKey: "AIzaSyAcXIAQ2baQhhIeC0fFriGQ8_v_pqHtQzI",
  authDomain: "quiz-app-prathisha.firebaseapp.com",
  projectId: "quiz-app-prathisha",
  storageBucket: "quiz-app-prathisha.appspot.com",
  messagingSenderId: "290787249640",
  appId: "1:290787249640:web:30dfd4c0970eea3224e85d",
  measurementId: "G-8F63ZD6Y89"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app); // ✅ Export Realtime Database
