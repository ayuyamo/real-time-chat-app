import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../components/firebaseConfig";

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider(); // create a new Google auth provider
    try { // sign in with Google
        const result = await signInWithPopup(auth, provider); // open a popup window to sign in
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