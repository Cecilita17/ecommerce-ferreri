import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBG4LyRcUKI4P8Af066uqis6UGRnUDOhLQ",
  authDomain: "ecommerce-perros.firebaseapp.com",
  projectId: "ecommerce-perros",
  storageBucket: "ecommerce-perros.appspot.com",
  messagingSenderId: "1077614901941",
  appId: "1:1077614901941:web:22e7033069c5e130465cfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);