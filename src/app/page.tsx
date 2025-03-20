'use client'; // use client-side code
import { useEffect, useState } from "react";
import { auth } from "./lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => { // set up a listener for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (userState) => setUser(userState)); // set the user state
    return () => unsubscribe();// unsubscribe when the component unmounts
  }, []);

  return (
    <div>
      {user ? (<ChatRoom user={user} />) : (<Login />)} {/* show chat room if user is signed in, otherwise show login */}
    </div>
  );
}
