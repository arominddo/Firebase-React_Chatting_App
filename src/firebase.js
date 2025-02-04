// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBveH-bg2xNIHiuBH1pEaQNnQDLRNb85bc",
  authDomain: "react-chat-app-18e19.firebaseapp.com",
  databaseURL : "https://react-chat-app-18e19-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-chat-app-18e19",
  storageBucket: "react-chat-app-18e19.firebasestorage.app",
  messagingSenderId: "249876165068",
  appId: "1:249876165068:web:c865db00c4b9d9e37f2d69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;