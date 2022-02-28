import firebase from "firebase";
//import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANhJjLxHcoTu4ecMNdx7Dkaec0nkDUsbA",
  authDomain: "clone-d59c6.firebaseapp.com",
  projectId: "clone-d59c6",
  storageBucket: "clone-d59c6.appspot.com",
  messagingSenderId: "41930468501",
  appId: "1:41930468501:web:78f7913b0f54c3d0093f9c",
  measurementId: "G-6CSDPQSPMH"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth};