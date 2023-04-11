import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBdfPieYIj4cLV3G1PkJI3_PG6amZCjL6Q",
  authDomain: "workruit-app.firebaseapp.com",
  databaseURL: "https://workruit-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "workruit-app",
  storageBucket: "workruit-app.appspot.com",
  messagingSenderId: "1044970896739",
  appId: "1:1044970896739:web:83c9c693f089a3d33a2756",
  measurementId: "G-FQB5RLXZKC"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
export {db, storage};