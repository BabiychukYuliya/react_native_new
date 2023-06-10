import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyCGUAEBNbkwNQMKXK6gBvjQF-YrUsr2ovw",
  authDomain: "mobileapp-5845a.firebaseapp.com",
  projectId: "mobileapp-5845a",
  storageBucket: "mobileapp-5845a.appspot.com",
  messagingSenderId: "623092305948",
  appId: "1:623092305948:web:d3ff141ad20f35ab7d4fd9",
  measurementId: "G-5EPV6R4YR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };