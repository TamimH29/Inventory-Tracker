// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4PYiDYH9lqFA-7NamG3U7sdK1Nqpjtk4",
  authDomain: "inventory-management-77c62.firebaseapp.com",
  projectId: "inventory-management-77c62",
  storageBucket: "inventory-management-77c62.appspot.com",
  messagingSenderId: "23951754373",
  appId: "1:23951754373:web:9912ab42dfcf8d244cd5ec",
  measurementId: "G-QG5CCPN51G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}