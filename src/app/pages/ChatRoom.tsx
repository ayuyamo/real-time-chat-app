// components/ChatRoom.tsx
import { useState, useEffect, ChangeEvent, FormEvent, use } from 'react';
import { signOutUser } from "../lib/firebaseAuth"; // Importing signOutUser function (correct path)
import { addMessage } from "../lib/firestore"; // Importing addMessage function (correct path)
import { setTypingStatus, listenToTyping } from '../lib/typingIndicatorService'; // Import functions directly
import Loading from './Loading';
import { useRef } from 'react';
import RealTimeMessages from '../hooks/realTimeMessages';
import { TypingBubble } from '../components/TypingBubble';

interface ChatRoomProps {
    user: any;  // User object passed as a prop
}

const ChatRoom: React.FC<ChatRoomProps> = ({ user }) => {
    const [formValue, setFormValue] = useState<string>('');  // State for message input
    const [usersTyping, setUsersTyping] = useState<{ username: string; photoURL: string }[]>([]);  // State to track users typing
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [userTypingPhotos, setUserTypingPhotos] = useState<string[]>([]); // State to store user photos
    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the timeout ID

    function onInputChange(roomId: string, user: any) {
        setTypingStatus(roomId, user.displayName, user.uid, user.photoURL, true);
        clearTimeout(timeoutRef.current ?? undefined); // Clear previous timeout
        timeoutRef.current = setTimeout(() => {
            setTypingStatus(roomId, user.displayName, user.uid, user.photoURL, false);
        }, 1000); // 1 sec after last keypress
    }

    useEffect(() => {
        listenToTyping("room123", setUsersTyping); // Listen to typing status changes
    }, []); // Empty dependency array to run once on mount  });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formValue.trim()) return;  // Don't submit if input is empty

        await addMessage(formValue, user.uid, user.photoURL, user.displayName); // Send the message
        setFormValue(""); // Clear the input
        setTypingStatus("room123", user.displayName, user.uid, user.photoURL, false); // Notify stopped typing
    };

    // Scroll to the bottom when usersTyping or messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        if (!usersTyping.length ||
            (usersTyping.length === 1 && usersTyping[0].username === user.displayName) // If only the current user is typing, don't show the typing bubble
        ) {
            setUserTypingPhotos([]); // Clear photos if no users are typing
            return;
        }
        setUserTypingPhotos(usersTyping.map((user) => user.photoURL)); // Get the photos of users typing
    }, [usersTyping]);

    const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValue(e.target.value); // Update form value as the user types
        onInputChange("room123", user); // Call the typing status function
        console.log('current users typing: ', usersTyping); // Log the users typing
        console.log('current user typing photos: ', userTypingPhotos); // Log the user typing photos
    };


    if (!user) return <Loading />; // Show loading if user is not logged in

    return (
        <div className='flex flex-col h-screen justify-between gradient-background'>
            <div className='flex justify-between items-center background-transparent p-4 shadow-md shadow-gray-900/10 backdrop-blur-md'>
                <h1 className="text-xl font-bold pl-4">Welcome to the chat room, {user.displayName}!</h1>
                <button
                    onClick={signOutUser}
                    className="rounded-full text-small text-white hover:scale-110 transition duration-300 ease-in-out bg-gradient-to-r from-purple-500 to-pink-500 shadow-md shadow-gray-900/2 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium text-sm px-5 py-2.5 text-center"
                >
                    Sign out
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-20"> {/* Limit height */}
                {/* Messages will be displayed here */}
                <RealTimeMessages user={user} /> {/* Display real-time messages */}
                <div ref={messagesEndRef}></div>
                {userTypingPhotos.length > 0 && <TypingBubble img={userTypingPhotos} />} {/* Typing bubble for the current user */}
                <form onSubmit={handleSubmit} className='fixed bottom-0 left-0 w-full flex p-4 gap-4 justify-center items-center pl-10 pr-10'> {/* form for sending messages */}
                    <input className="block w-[1000px] p-4 ps-10 text-sm focus:ring-0 focus:outline-none text-gray-900 rounded-full bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                        value={formValue}
                        onChange={handleTyping} // update formValue when the input changes
                        placeholder="Type Message..." />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 opacity-0">
                        Send
                    </button>
                </form >
            </div>
        </div>
    );
};

export default ChatRoom; // Export the component
