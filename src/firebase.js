// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAykGCg8-bEE0hU__OnuIhUAdHAf6Tb-Hw",
  authDomain: "task-management-dcc39.firebaseapp.com",
  projectId: "task-management-dcc39",
  storageBucket: "task-management-dcc39.appspot.com",
  messagingSenderId: "1037750953552",
  appId: "1:1037750953552:web:078b27136f87dd1f1bd355",
  measurementId: "G-EPP41NZ48Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
