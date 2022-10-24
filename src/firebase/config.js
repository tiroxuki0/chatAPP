// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOSybas8ltr69tBn0dQontiekDYmkKtmM",
  authDomain: "chat-app-cc703.firebaseapp.com",
  projectId: "chat-app-cc703",
  storageBucket: "chat-app-cc703.appspot.com",
  messagingSenderId: "367307364925",
  appId: "1:367307364925:web:fb70b6ca770d1426406854",
  measurementId: "G-HCXDDKVX50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099");

const db = getFirestore(app);
connectFirestoreEmulator(db, "localhost", 8080);

const storage = getStorage(app);
connectStorageEmulator(storage, "localhost", 9199);

export { auth, db, storage };
