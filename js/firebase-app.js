// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

// Your Firebase configuration (replace these with your actual values)
const firebaseConfig = {
    apiKey: "AIzaSyDgl0J-ybrj04eKkmCcIW-kjaO9U_IvOd4",
    authDomain: "kasaysayan-a3cc5.firebaseapp.com",
    projectId: "kasaysayan-a3cc5",
    storageBucket: "kasaysayan-a3cc5.firebasestorage.app",
    messagingSenderId: "601208143349",
    appId: "1:601208143349:web:b106fdc1dced1e4824b4bc",
    measurementId: "G-YL6ME86E1V"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized successfully!");
