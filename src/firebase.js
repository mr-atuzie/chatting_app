import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIvXS4NMXpIM0Fk9I0hxcC0jiRKnGfnz8",
  authDomain: "chat-app-90750.firebaseapp.com",
  projectId: "chat-app-90750",
  storageBucket: "chat-app-90750.appspot.com",
  messagingSenderId: "55578415311",
  appId: "1:55578415311:web:cec1171ee0d3fd09ffe7ba",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
