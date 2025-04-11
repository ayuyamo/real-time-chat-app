// lib/TypingIndicatorService.ts
import { realTimeDb } from './firebaseConfig'; // Import the database instance
import { DatabaseReference } from 'firebase/database';
import { onValue, ref, set, get } from 'firebase/database'; // Import necessary functions from Firebase

export function setTypingStatus(
  roomId: string,
  username: string,
  isTyping: boolean
) {
  const typingRef = ref(realTimeDb, `typingStatus/${roomId}/${username}`);
  set(typingRef, isTyping); // sets it to true or false
}

export function listenToTyping(
  roomId: string,
  callback: (usersTyping: string[]) => void
) {
  const roomTypingRef = ref(realTimeDb, `typingStatus/${roomId}`);

  onValue(roomTypingRef, (snapshot) => {
    const data = snapshot.val() || {};
    const usersTyping = Object.entries(data)
      .filter(([_, isTyping]) => isTyping)
      .map(([username]) => username);

    callback(usersTyping);
  });
}
