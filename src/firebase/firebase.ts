// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYFMEV7eEuzvFoK94T-OCKzhCl5mgQHwY",
  authDomain: "easytrack-ebd49.firebaseapp.com",
  projectId: "easytrack-ebd49",
  storageBucket: "easytrack-ebd49.firebasestorage.app",
  messagingSenderId: "613179024016",
  appId: "1:613179024016:web:d85f69b740221bc244ae15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);