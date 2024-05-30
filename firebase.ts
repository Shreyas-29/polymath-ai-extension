import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from "@firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADkHESO7_7uRgU_9Oc2OY06aA73ypQhRA",
    authDomain: "polymath-url-saver.firebaseapp.com",
    projectId: "polymath-url-saver",
    storageBucket: "polymath-url-saver.appspot.com",
    messagingSenderId: "585097778496",
    appId: "1:585097778496:web:455c1d127cdcf47338d6a5"
};

// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
if (!getApps().length) {
    initializeApp(firebaseConfig);
} else {
    getApps();
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();