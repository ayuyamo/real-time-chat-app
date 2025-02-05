import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../components/firebaseConfig";

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("User signed in: ", result.user);
    } catch (error) {
        console.error("Error signing in: ", error);
    }
};

export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("User signed out");
    } catch (error) {
        console.error("Error signing out: ", error);
    }
};