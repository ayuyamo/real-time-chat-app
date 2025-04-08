// // components/TypingIndicator.tsx
// import React, { useState, useEffect } from 'react';
// import { subscribeToTypingUsers } from '../lib/typingIndicatorService';
// // import TypingIndicatorService from '../lib/typingIndicatorService'; // Import the typing indicator service

// interface TypingIndicatorProps {
//   chatId: string; // Chat ID as a prop
// }

// const TypingIndicator: React.FC<TypingIndicatorProps> = ({ chatId }) => {
//   const [typingUsers, setTypingUsers] = useState<string[]>([]); // State to track typing users

//   useEffect(() => {
//     if (!chatId) return;

//     // Subscribe to typing users for the given chat
//     const unsubscribe = subscribeToTypingUsers(chatId, setTypingUsers);
//     return () => unsubscribe(); // Clean up on component unmount
//   }, [chatId]);

//   if (typingUsers.length === 0) return null;

//   return (
//     <div className="typing-indicator">
//       {typingUsers.length === 1
//         ? `${typingUsers[0]} is typing...`
//         : `${typingUsers.length} people are typing...`}
//     </div>
//   );
// };

// export default TypingIndicator;
