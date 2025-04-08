import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'; // Import the Realtime Database service
import { da } from 'date-fns/locale';

const firebaseConfig = {
  apiKey: 'AIzaSyDIQU_3u-_v1CDvS0sItpxJPTU1ZhdSDxE',
  authDomain: 'chat-room-1d2d4.firebaseapp.com',
  projectId: 'chat-room-1d2d4',
  storageBucket: 'chat-room-1d2d4.firebasestorage.app',
  messagingSenderId: '766150863269',
  appId: '1:766150863269:web:a6f080a25fcf4ab3e7204c',
  measurementId: 'G-7WYY0MVV5F',
  databaseURL: 'https://chat-room-1d2d4-default-rtdb.firebaseio.com/', // Add your Realtime Database URL
};

const app = initializeApp(firebaseConfig); // initialize Firebase
const auth = getAuth(app); // get the Firebase Auth service
const db = getFirestore(app); // get the Firestore service
const realTimeDb = getDatabase(app); // get the Realtime Database service

let analytics;
if (typeof window !== 'undefined') {
  // check if window is defined
  analytics = getAnalytics(app); // get the Firebase Analytics service
}

export { auth, analytics, db, realTimeDb };
