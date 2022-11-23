// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOSybas8ltr69tBn0dQontiekDYmkKtmM",
  authDomain: "chat-app-cc703.firebaseapp.com",
  databaseURL:
    "https://chat-app-cc703-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-cc703",
  storageBucket: "chat-app-cc703.appspot.com",
  messagingSenderId: "367307364925",
  appId: "1:367307364925:web:fb70b6ca770d1426406854",
  measurementId: "G-HCXDDKVX50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// connectAuthEmulator(auth, "http://localhost:9099");

const db = getFirestore(app);
// connectFirestoreEmulator(db, "localhost", 8080);

const storage = getStorage(app);
// connectStorageEmulator(storage, "localhost", 9199);

const rtdb = getDatabase();
// connectDatabaseEmulator(db, "localhost", 9000);

export { auth, db, storage, rtdb };
