/**
 * We use firebase for authentication
 * Access to user info is provided at AuthContext in components
 */
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA4JsIV-WevFvSRXfQWRpKUpvqWCheIxlQ",
    authDomain: "thebrosproj.firebaseapp.com",
    projectId: "thebrosproj",
    storageBucket: "thebrosproj.appspot.com",
    messagingSenderId: "197012732766",
    appId: "1:197012732766:web:b7a52e33bce7c5e9be6dcf"
  };

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export default firebase;
