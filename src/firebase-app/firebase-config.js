import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABNmyQ4PFhkitPgqu14XoH-LZagvN938c",
  authDomain: "myblog-2ff17.firebaseapp.com",
  projectId: "myblog-2ff17",
  storageBucket: "myblog-2ff17.appspot.com",
  messagingSenderId: "228260968444",
  appId: "1:228260968444:web:debb18b287cf6b3825e479",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
