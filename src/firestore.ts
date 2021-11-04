import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7gpnMYL98kf63zyPtWhRaK6WxOkcU3Mo",
  authDomain: "ti4-agenda-phase.firebaseapp.com",
  projectId: "ti4-agenda-phase",
  storageBucket: "ti4-agenda-phase.appspot.com",
  messagingSenderId: "298763386832",
  appId: "1:298763386832:web:186369fa5e9267cfc683d5",
  databaseURL:
    "https://ti4-agenda-phase-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
