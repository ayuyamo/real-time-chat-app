import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const addMessage = async (
  message: string,
  uid: string,
  photoURL: string,
  displayName: string,
  imageUrl = ''
) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      message,
      uid,
      photoURL,
      displayName,
      imageUrl,
      createdAt: serverTimestamp(), //the correct Firestore timestamp
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
