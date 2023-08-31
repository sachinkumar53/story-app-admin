// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaYOOVrp7YlMPyDKog23ZucpRk0ypYkiA",
  authDomain: "tictactoe-2c081.firebaseapp.com",
  databaseURL: "https://tictactoe-2c081.firebaseio.com",
  projectId: "tictactoe-2c081",
  storageBucket: "tictactoe-2c081.appspot.com",
  messagingSenderId: "372157847778",
  appId: "1:372157847778:web:4e68f1a84da400e22b66bb",
  measurementId: "G-4D82LF8196"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const usersRef = collection(db,"users");
export const publicationsRef = collection(db,"publications");