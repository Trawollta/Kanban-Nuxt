// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdiYq1m0ryEyDgEIAGssuEhokhkn0xCpw",
  authDomain: "nuxt-join-228b9.firebaseapp.com",
  projectId: "nuxt-join-228b9",
  storageBucket: "nuxt-join-228b9.appspot.com",
  messagingSenderId: "668353619728",
  appId: "1:668353619728:web:57ab992d51c246cf152795"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportiere die Firestore-Datenbank
export default defineNuxtPlugin((nuxtApp) => {
    // Du kannst db jetzt in der ganzen Anwendung verwenden
    nuxtApp.provide('db', db);
  });