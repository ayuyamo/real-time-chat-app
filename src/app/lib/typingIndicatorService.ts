import { realTimeDb } from './firebaseConfig'; // Import the database instance
import { onValue, ref, set, get } from 'firebase/database'; // Import necessary functions from Firebase

type TypingEntry = {
  isTyping: boolean;
  photoURL?: string;
};

export function setTypingStatus(
  roomId: string,
  username: string,
  userId: string,
  userImg: string,
  isTyping: boolean
) {
  const typingRef = ref(realTimeDb, `typingStatus/${roomId}/${username}`);
  set(typingRef, {
    isTyping: isTyping,
    uid: userId,
    photoURL: userImg,
  }); // sets it to true or false
  console.log('current data: ', typingRef); // Log the current data
}

export function listenToTyping(
  roomId: string,
  callback: (usersTyping: { username: string; photoURL: string }[]) => void
) {
  const roomTypingRef = ref(realTimeDb, `typingStatus/${roomId}`);

  onValue(roomTypingRef, (snapshot) => {
    const data = (snapshot.val() as Record<string, TypingEntry>) || {};
    const usersTyping = Object.entries(data)
      .filter(([_, value]) => value?.isTyping)
      .map(([username, value]) => ({
        username,
        photoURL: value.photoURL || '/default-avatar.png',
      })); // Default avatar if no photoUrl is provided
    console.log('users typing: ', usersTyping); // Log the users typing
    callback(usersTyping);
  });
}
