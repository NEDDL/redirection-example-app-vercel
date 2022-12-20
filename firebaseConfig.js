// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCj_mNiNFtnaWd0o0pdQ_r2FoegUibs-OM",
  authDomain: "soleilex-d817e.firebaseapp.com",
  projectId: "soleilex-d817e",
  storageBucket: "soleilex-d817e.appspot.com",
  messagingSenderId: "802157051327",
  appId: "1:802157051327:web:56082d81ff98cba948750a",
  measurementId: "G-S3RFRCNET3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
