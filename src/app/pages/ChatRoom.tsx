// components/ChatRoom.tsx
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { signOutUser } from "../lib/firebaseAuth"; // Importing signOutUser function (correct path)
import { addMessage } from "../lib/firestore"; // Importing addMessage function (correct path)
import TypingIndicator from '../components/TypingIndicator';  // Import TypingIndicator component (adjust the relative path)
import { setTypingStatus, subscribeToTypingUsers } from '../lib/typingIndicatorService'; // Import functions directly
import Loading from './Loading';

interface ChatRoomProps {
  user: any;  // User object passed as a prop
  chatId: string;  // Chat ID passed as a prop
}

const ChatRoom: React.FC<ChatRoomProps> = ({ user, chatId }) => {
  const [formValue, setFormValue] = useState<string>('');  // State for message input
  const [isTyping, setIsTyping] = useState<boolean>(false);  // State to track typing status

  useEffect(() => {
    if (!user) return;

    // Set typing status when the user starts typing
    const typingTimeout = setTimeout(() => {
      if (isTyping) {
        setTypingStatus(chatId, user.uid, true); // Notify typing status to Firebase
      }
    }, 500); // Wait for 500ms after typing starts

    return () => clearTimeout(typingTimeout); // Cleanup when typing stops or component unmounts
  }, [isTyping, user, chatId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValue.trim()) return;  // Don't submit if input is empty

    await addMessage(formValue, user.uid, user.photoURL, user.displayName); // Send the message
    setFormValue(""); // Clear the input
    setTypingStatus(chatId, user.uid, false); // Notify stopped typing
  };

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value); // Update form value as the user types
    setIsTyping(true); // Set typing status to true
  };

  if (!user) return <Loading />; // Show loading if user is not logged in

  return (
    <div>
      <h1>Welcome to the chat room, {user.displayName}</h1>
      <TypingIndicator chatId={chatId} /> {/* Show typing indicator */}
      <form onSubmit={handleSubmit}>
        <input
          className="message-input"
          value={formValue}
          onChange={handleTyping}  // Handle typing event
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={signOutUser}>Sign out</button> {/* Sign out button */}
    </div>
  );
};

export default ChatRoom; // Export the component
