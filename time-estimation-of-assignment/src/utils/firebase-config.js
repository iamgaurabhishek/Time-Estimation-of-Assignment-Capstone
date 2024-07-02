import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC3LvJ0wRLzYmVcsF15jsaatCmna4VZ3mI",
  authDomain: "react-time-estimation-project.firebaseapp.com",
  projectId: "react-time-estimation-project",
  storageBucket: "react-time-estimation-project.appspot.com",
  messagingSenderId: "546140124503",
  appId: "1:546140124503:web:4dc8860b0083a31a20fa12",
  measurementId: "G-RQ7KZNBQX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);