// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN_YrN3gfo8ETv7g-jTuS_1j84HAgOLbU",
  authDomain: "note-app-graphql.firebaseapp.com",
  projectId: "note-app-graphql",
  storageBucket: "note-app-graphql.appspot.com",
  messagingSenderId: "461330493137",
  appId: "1:461330493137:web:54255b6b3847ed71ac1ff0",
  measurementId: "G-ZYCSLHBFMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);