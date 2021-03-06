import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkX03WMLeaaRpVfNpEPN-IRGTOrBma4gI",
  authDomain: "reels-b2732.firebaseapp.com",
  projectId: "reels-b2732",
  storageBucket: "reels-b2732.appspot.com",
  messagingSenderId: "726229681307",
  appId: "1:726229681307:web:aee5c93dcca09a2c39723e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// object for auth
export const auth = firebase.auth();

// object for firestore
const firestore = firebase.firestore();

export const database = {
  // users collection will be store in firestore i.e. (firestore.collection) 
  users: firestore.collection('users'),
  posts: firestore.collection('posts'),
  comments: firestore.collection('comments'),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const storage = firebase.storage();
