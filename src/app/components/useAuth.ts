'use client';
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => { // set up a listener for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // set the user state
            if (user) { // redirect to chat room if user is signed in
                router.push("/chat-room");
            } else {
                router.push("/");
            }
        });

        return () => unsubscribe(); // unsubscribe when the component unmounts
    }, []);

    return user;
}