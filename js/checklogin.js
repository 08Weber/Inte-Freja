import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

// Firebase configuration  
const firebaseConfig = {
  apiKey: "AIzaSyCTSoplo8zZHOVvFMQ0J9IarbkJUHRtuBs",
  authDomain: "freja-auth.firebaseapp.com",
  databaseURL: "https://freja-auth-default-rtdb.firebaseio.com",
  projectId: "freja-auth",
  storageBucket: "freja-auth.appspot.com",
  messagingSenderId: "84399094677",
  appId: "1:84399094677:web:c655e64800ec65eb69149c",
  measurementId: "G-YKK6L845XQ"
};

// Initialize Firebase  
const app = initializeApp(firebaseConfig);

// Automatically log in the user  
localStorage.setItem("isLoggedIn", "true");

// Redirect to the main page  
window.location.href = "./dashboard.html";
