// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj7AnnmvKlEKmyeK0Gd2YCbSFyhFnOUbI",
  authDomain: "quizquiz-acde9.firebaseapp.com",
  projectId: "quizquiz-acde9",
  storageBucket: "quizquiz-acde9.appspot.com",
  messagingSenderId: "603889007701",
  appId: "1:603889007701:web:42c59fa16d8df8463768dc",
  measurementId: "G-2JR9JSL3KN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);