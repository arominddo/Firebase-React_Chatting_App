// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import "firebase/auth";
import "firebase/database";
import "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBs0_3e0ugG-tU2efDB-FgyO9DGqYQ9dI",
  authDomain: "react-firebase-chat-app-e1fdd.firebaseapp.com",
  projectId: "react-firebase-chat-app-e1fdd",
  storageBucket: "react-firebase-chat-app-e1fdd.appspot.com",
  messagingSenderId: "267209082714",
  appId: "1:267209082714:web:ffbccbcc0d3f5fb7a4d563",
  measurementId: "G-CZ77BF3D6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);