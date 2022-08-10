import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOhLwa8WZ7Tbwn0gIgFjFI_A480w99Oyk",
  authDomain: "video-23816.firebaseapp.com",
  projectId: "video-23816",
  storageBucket: "video-23816.appspot.com",
  messagingSenderId: "880619299114",
  appId: "1:880619299114:web:0c206fa64d7557df613e53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
