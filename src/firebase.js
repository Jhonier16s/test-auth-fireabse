// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import {getAuth} from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCuyD6OhR7wuLlH03HQZo9QsHcpX3BO6A",
  authDomain: "fir-auth-eb00f.firebaseapp.com",
  projectId: "fir-auth-eb00f",
  storageBucket: "fir-auth-eb00f.appspot.com",
  messagingSenderId: "335314656156",
  appId: "1:335314656156:web:35f2e7340818a4809b8659"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);