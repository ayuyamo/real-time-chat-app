'use client';
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("User state changed. User: ", user);
            setUser(user);
            if (user) {
                router.push("/chat-room");
            } else {
                router.push("/");
            }
        });

        return () => unsubscribe();
    }, []);

    return user;
}