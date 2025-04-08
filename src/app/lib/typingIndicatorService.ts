// lib/TypingIndicatorService.ts
import {realTimeDb } from './firebaseConfig'; // Import the database instance
import { DatabaseReference } from 'firebase/database';
import { onValue, ref, set, get } from 'firebase/database'; // Import necessary functions from Firebase


export function setTypingStatus(roomId:string, username:string, isTyping:boolean) {
  const typingRef = ref(realTimeDb, `typingStatus/${roomId}/${username}`);
  set(typingRef, isTyping); // sets it to true or false
}



export function listenToTyping(roomId:string, callback:(usersTyping: string[]) => void) {
  const roomTypingRef = ref(realTimeDb, `typingStatus/${roomId}`);

  onValue(roomTypingRef, (snapshot) => {
    const data = snapshot.val() || {};
    const usersTyping = Object.entries(data)
      .filter(([_, isTyping]) => isTyping)
      .map(([username]) => username);
      
    callback(usersTyping);
  });
}





//   // Set the typing status to true or false
// export function setTypingStatus(chatId: string, userId: string, isTyping: boolean): void {
//     const typingRef = ref(realTimeDb, `chats/${chatId}/typing/${userId}`);
    
//     if (isTyping) {
//       const timestamp = Date.now();
//       set(typingRef, timestamp);
      
//       // Clear typing status after timeout
//       setTimeout(() => {
//         // Only clear if no newer timestamp was set
//         get(typingRef).then((snapshot) => {
//           if (snapshot.val() === timestamp) {
//             set(typingRef, null);
//           }
//         });
//       }, 5000);
//     } else {
//       set(typingRef, null); // Reset typing status when not typing
//     }
//   }

//   // Subscribe to updates for typing users in a chat
// export function subscribeToTypingUsers(chatId: string, callback: (users: string[]) => void): () => void {
//     const typingRef: DatabaseReference = ref(realTimeDb, `chats/${chatId}/typing`);
//     return onValue(typingRef, (snapshot) => {
//       const typing = snapshot.val() || {};
//       // Filter out stale typing indicators (older than 6 seconds)
//       const activeTyping: string[] = Object.entries(typing)
//         .filter(([_, timestamp]) => Date.now() - timestamp < 6000)
//         .map(([userId]) => userId);
//       callback(activeTyping); // Pass active users to the callback
//     });
//   }

