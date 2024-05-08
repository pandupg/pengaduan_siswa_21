// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALUv9va9JWQXi-kwlkoLlkd3vUXkoObTA",
    authDomain: "pengaduan-siswa-21.firebaseapp.com",
    projectId: "pengaduan-siswa-21",
    storageBucket: "pengaduan-siswa-21.appspot.com",
    messagingSenderId: "462236083460",
    appId: "1:462236083460:web:0643a0261b03b633bf1c51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)