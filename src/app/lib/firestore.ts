// import { collection, addDoc } from "firebase/firestore";
// import { db } from "./firebaseConfig";

// export const addMessage = async ( // add a new message to the Firestore database
//     message: string, 
//     uid: string,
//     photoURL: string,
//     displayName: string
// ) => {
//     try { // add a new document with a generated ID
//         const docRef = await addDoc(collection(db, "messages"), {
//             message: message,
//             uid: uid,
//             photoURL: photoURL,
//             displayName: displayName,
//             createdAt: new Date(),
//         });
//         console.log("Document written with ID: ", docRef.id);
//     } catch (error) {
//         console.error("Error adding document: ", error);
//     }
// }

//updated
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addMessage = async (
  message: string,
  uid: string,
  photoURL: string,
  displayName: string,
  imageUrl = ""
) => {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      message,
      uid,
      photoURL,
      displayName,
      imageUrl,
      createdAt: serverTimestamp(), //the correct Firestore timestamp
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
