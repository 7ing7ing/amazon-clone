import firebase from "firebase";
//import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: /*Info removed */,
  authDomain: /*Info removed */,
  projectId: /*Info removed */,
  storageBucket: /*Info removed */,
  messagingSenderId: /*Info removed */,
  appId: /*Info removed */,
  measurementId: /*Info removed */
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth};