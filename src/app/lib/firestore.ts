import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addMessage = async (
    message: string, 
    uid: string,
    photoURL: string,
    displayName: string
) => {
    try {
        await addDoc(collection(db, "messages"), {
            message,
            uid,
            photoURL,
            displayName,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error adding message:", error);
    }
};

export const updateTypingStatus = async (
    uid: string,
    displayName: string,
    isTyping: boolean
) => {
    try {
        await setDoc(doc(db, "typingStatus", uid), {
            uid,
            displayName,
            isTyping,
            lastUpdated: serverTimestamp()
        }, { merge: true });
        console.log(`Typing status updated: ${displayName} - ${isTyping}`);
    } catch (error) {
        console.error("Error updating typing status:", error);
    }
};