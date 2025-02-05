import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addMessage = async (
    message: string,
    uid: string,
    photoURL: string,
    displayName: string
) => {
    try {
        const docRef = await addDoc(collection(db, "messages"), {
            message: message,
            uid: uid,
            photoURL: photoURL,
            displayName: displayName,
            createdAt: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}