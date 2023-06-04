import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCFo1JZc6ZrN2LpyUvsmZtTV_PTDzNYdCw",
    authDomain: "pokerift-6eebf.firebaseapp.com",
    projectId: "pokerift-6eebf",
    storageBucket: "pokerift-6eebf.appspot.com",
    messagingSenderId: "109543560669",
    appId: "1:109543560669:web:7a7ccdbfd3e240ae8ed234",
    measurementId: "G-Y8ZGLP2RMQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { auth, db, analytics };