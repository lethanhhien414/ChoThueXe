import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUpGlMtw-AAyHFic8FhGTw3WJp_fg9KXA",
  authDomain: "smartride-cdio.firebaseapp.com",
  projectId: "smartride-cdio",
  storageBucket: "smartride-cdio.firebasestorage.app",
  messagingSenderId: "96970728502",
  appId: "1:96970728502:web:4ed270444ba96c24dfa497",
};
const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

// Auth
const auth = getAuth(app);

// Firestore
const db = getFirestore(app);

// Export dùng toàn project
export { app, auth, db };
