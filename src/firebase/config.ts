// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQOittK_kQPrKEyGcyGpBC1meVF0OtHbA",
  authDomain: "api-crud-firebase.firebaseapp.com",
  projectId: "api-crud-firebase",
  storageBucket: "api-crud-firebase.appspot.com",
  messagingSenderId: "921189702266",
  appId: "1:921189702266:web:e274396e302c3f5a7f79c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);