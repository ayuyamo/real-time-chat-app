import { realTimeDb } from './firebaseConfig'; // Import the database instance
import { onValue, ref, set, get } from 'firebase/database'; // Import necessary functions from Firebase

type TypingEntry = {
  isTyping: boolean;
  uid: string;
  photoURL?: string;
};

export function setTypingStatus( // called when current user's typing status changes
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

export function listenToTyping( // set up listener for any changes made to real time database
  roomId: string,
  callback: (
    usersTyping: { username: string; uid: string; photoURL: string }[]
  ) => void
) {
  const roomTypingRef = ref(realTimeDb, `typingStatus/${roomId}`);

  onValue(roomTypingRef, (snapshot) => {
    // if changes recognized, fetch data
    const data = (snapshot.val() as Record<string, TypingEntry>) || {};
    const usersTyping = Object.entries(data)
      .filter(([_, value]) => value?.isTyping)
      .map(([username, value]) => ({
        username,
        uid: value.uid,
        photoURL: value.photoURL || '/default-avatar.png',
      })); // Default avatar if no photoUrl is provided
    console.log('users typing: ', usersTyping); // Log the users typing
    callback(usersTyping);
  });
}
