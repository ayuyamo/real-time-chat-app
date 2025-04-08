// components/ChatRoom.tsx
import { useState, useEffect, ChangeEvent, FormEvent, use } from 'react';
import { signOutUser } from "../lib/firebaseAuth"; // Importing signOutUser function (correct path)
import { addMessage } from "../lib/firestore"; // Importing addMessage function (correct path)
// import TypingIndicator from '../components/TypingIndicator';  // Import TypingIndicator component (adjust the relative path)
import {setTypingStatus, listenToTyping}  from '../lib/typingIndicatorService'; // Import functions directly
import Loading from './Loading';
import { useRef } from 'react';
import RealTimeMessages from '../hooks/realTimeMessages';

interface ChatRoomProps {
  user: any;  // User object passed as a prop
}

const ChatRoom: React.FC<ChatRoomProps> = ({ user }) => {
  const [formValue, setFormValue] = useState<string>('');  // State for message input
  const [isTyping, setIsTyping] = useState<boolean>(false);  // State to track typing status
  const [usersTyping, setUsersTyping] = useState<string[]>([]);  // State to track users typing

  const timeoutRef = useRef<NodeJS.Timeout | null> (null); // Ref to store the timeout ID

  function onInputChange(roomId:string, username:string) {
    setTypingStatus(roomId, username, true);
    clearTimeout(timeoutRef.current ?? undefined); // Clear previous timeout
    timeoutRef.current = setTimeout(() => {
      setTypingStatus(roomId, username, false);
    }, 1000); // 1 sec after last keypress
  }

  useEffect(() => {
    listenToTyping("room123", setUsersTyping); // Listen to typing status changes
    }, []); // Empty dependency array to run once on mount  });
  useEffect(() => {
    if (!user) return;

    // Set typing status when the user starts typing
    const typingTimeout = setTimeout(() => {
      if (isTyping) {
        setTypingStatus("room123", user.uid, true); // Notify typing status to Firebase
      }
    }, 500); // Wait for 500ms after typing starts

    return () => clearTimeout(typingTimeout); // Cleanup when typing stops or component unmounts
  }, [isTyping, user, "room123"]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValue.trim()) return;  // Don't submit if input is empty

    await addMessage(formValue, user.uid, user.photoURL, user.displayName); // Send the message
    setFormValue(""); // Clear the input
    setTypingStatus("room123", user.uid, false); // Notify stopped typing
  };

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value); // Update form value as the user types
    // setIsTyping(true); // Set typing status to true
    onInputChange("room123", user.displayName); // Call the typing status function
  };

  if (!user) return <Loading />; // Show loading if user is not logged in

  return (
    <div>
      <h1>Welcome to the chat room, {user.displayName}</h1>
      <RealTimeMessages user={user} /> {/* Display real-time messages */}
      {/* <TypingIndicator chatId={chatId} /> */}
      {usersTyping.length > 0 &&  (
        <p>{usersTyping.join(", ")} {usersTyping.length === 1 ? "is" : "are"} typing ...</p>
      )}
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
