import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0OHVJrHKUA326IRyQZv5bpnAdFgvaMes",
  authDomain: "chat-cf011.firebaseapp.com",
  projectId: "chat-cf011",
  storageBucket: "chat-cf011.appspot.com",
  messagingSenderId: "1049926589093",
  appId: "1:1049926589093:web:575faeec420d10511a8b4c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
