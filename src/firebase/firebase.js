import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCQ8vjJdbFSSk9QjV0i4SrdJe30E5d5uJw",
  authDomain: "voting-system-340a8.firebaseapp.com",
  projectId: "voting-system-340a8",
  storageBucket: "voting-system-340a8.appspot.com",
  messagingSenderId: "282257185265",
  appId: "1:282257185265:web:4f2e097ec423aeb0948c50",
  measurementId: "G-SKRMM9QBKP"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export const db = getFirestore(app);
export default auth;