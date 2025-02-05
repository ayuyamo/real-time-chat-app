import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDIQU_3u-_v1CDvS0sItpxJPTU1ZhdSDxE",
    authDomain: "chat-room-1d2d4.firebaseapp.com",
    projectId: "chat-room-1d2d4",
    storageBucket: "chat-room-1d2d4.firebasestorage.app",
    messagingSenderId: "766150863269",
    appId: "1:766150863269:web:70e8c51316582aece7204c",
    measurementId: "G-ZWH9ZEG9PF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

export { auth, analytics, db };