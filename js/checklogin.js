import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app);

// Retrieve the stored keyId from localStorage
const keyId = localStorage.getItem("keyId");

if (keyId) {
  const keyDocRef = doc(db, "activationKeys", keyId);

  // Check the user's key status on page load
  if (keyId && !window.location.pathname.includes("välja.html")) {
    getDoc(keyDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          
          // Check if the key has expired
          const expirationDate = data.expiresAt?.toDate();
          if (expirationDate && expirationDate < new Date()) {
            // Handle key expiration and log the user out
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("keyId");
            alert("Din licensekey har löpt ut och du kommer loggas ut.");
            window.location.href = "./login.html";
          }
          
          // Check if the key is not logged in
          if (!data.isLoggedIn) {
            // Handle user logout
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("keyId");
            alert("Your session has been deactivated. You have been logged out.");
            window.location.href = "./login.html";
          }
        } else {
          // Redirect inactive users
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("keyId");
          window.location.href = "./login.html";
        }
      })
      .catch((error) => {
        console.error("Error checking status:", error);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("keyId");
        window.location.href = "./login.html";
      });
  } else if (!keyId) {
    // If no keyId in localStorage, redirect to the login page
    window.location.href = "./login.html";
  }
} else {
  // If no keyId in localStorage, redirect to the login page
  window.location.href = "./login.html";
}
