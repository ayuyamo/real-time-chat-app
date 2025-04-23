// components/ChatRoom.tsx
import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import { signOutUser } from "../lib/firebaseAuth"; // Importing signOutUser function (correct path)
import { addMessage } from "../lib/firestore"; // Importing addMessage function (correct path)
import { setTypingStatus, listenToTyping } from '../lib/typingIndicatorService'; // Import functions directly
import { uploadImage } from '../lib/uploadImage'; // Import image upload utility
import Loading from './Loading';
import RealTimeMessages from '../hooks/realTimeMessages';
import { TypingBubble } from '../components/TypingBubble';

interface ChatRoomProps {
    user: any;  // User object passed as a prop
}

const ChatRoom: React.FC<ChatRoomProps> = ({ user }) => {
    const [formValue, setFormValue] = useState<string>('');  // State for message input
    const [image, setImage] = useState<File | null>(null); // State for selected image
    const [usersTyping, setUsersTyping] = useState<{ username: string; uid: string; photoURL: string }[]>([]);  // State to track users typing
    const [userTypingPhotos, setUserTypingPhotos] = useState<string[]>([]); // State to store user photos
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref to trigger hidden file input
    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the timeout ID

    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ called whenever *current* user is/is not typing
    function onInputChange(roomId: string, user: any) {
        setTypingStatus(roomId, user.displayName, user.uid, user.photoURL, true);
        clearTimeout(timeoutRef.current ?? undefined); // Clear previous timeout
        timeoutRef.current = setTimeout(() => {
            setTypingStatus(roomId, user.displayName, user.uid, user.photoURL, false);
        }, 1000); // 1 sec after last keypress
    }

    // $$$$$$$$$$$$$$$$$$$$$ setting up a listener for any changes to realtime database 
    // if there are changes, then it fetches array of objects and store in usersTyping
    useEffect(() => {
        listenToTyping("room123", setUsersTyping); // Listen to typing status changes
    }, []); // Empty dependency array to run once on mount  });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (!formValue.trim() && !image) return;  // Don't submit if both input and image are empty

            let imageUrl = "";
            if (image) {
                imageUrl = await uploadImage(image); // Upload image and get URL
                console.log("Uploaded image URL:", imageUrl); // to check if it uploads correct url
                setImage(null); // Clear image after upload
            }

            await addMessage(formValue, user.uid, user.photoURL, user.displayName, imageUrl); // Send the message
            setFormValue(""); // Clear the input
            setTypingStatus("room123", user.displayName, user.uid, user.photoURL, false); // Notify stopped typing
        } catch (err) {
            console.error("\u274C Error in handleSubmit:", err);
        }
    };

    // Scroll to the bottom when usersTyping or messages change
    // $$$$$$$$$$$$$$$$$$$$$ filters out yourself in current users typing
    useEffect(() => {
        if (!usersTyping.length ||
            (usersTyping.length === 1 && usersTyping[0].uid === user.uid) // If only the current user is typing, don't show the typing bubble
        ) {
            setUserTypingPhotos([]); // Clear photos if no users are typing
            return;
        }
        setUserTypingPhotos(
            usersTyping
                .filter((u) => u.uid !== user.uid) // exclude current user
                .map((u) => u.photoURL) // map to just photo URLs
        );
    }, [usersTyping]);

    const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValue(e.target.value); // Update form value as the user types
        onInputChange("room123", user); // Call the typing status function
        console.log('current users typing: ', usersTyping); // Log the users typing
        console.log('current user typing photos: ', userTypingPhotos); // Log the user typing photos
    };

    const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setImage(file); // Set the selected image
    };

    if (!user) return <Loading />; // Show loading if user is not logged in

    return (
        <div className='flex flex-col h-screen justify-between gradient-background'>
            <div className='flex justify-between items-center background-transparent p-4 shadow-md shadow-gray-900/10 backdrop-blur-md'>
                <h1 className="text-xl font-bold pl-4">Welcome to the chat room, {user.displayName}!</h1>
                <button
                    onClick={signOutUser}
                    className="rounded-full text-small text-white hover:scale-110 transition duration-300 bg-gradient-to-r from-purple-600 to-pink-500 animate-gradient shadow-md hover:shadow-gray-700/50 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium text-sm px-5 py-2.5 text-center"
                >
                    Sign out
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-20"> {/* Limit height */}
                {/* Messages will be displayed here */}
                <RealTimeMessages user={user} /> {/* Display real-time messages */}
                {userTypingPhotos.length > 0 && <TypingBubble img={userTypingPhotos} />} {/* Typing bubble for the current user */}
            </div>
            <form onSubmit={handleSubmit} className='fixed bottom-0 left-0 w-full flex p-4 gap-4 justify-center items-center pl-10 pr-10'> {/* form for sending messages */}
                <input className="block w-[800px] p-4 ps-10 text-sm focus:ring-0 focus:outline-none text-gray-900 rounded-full bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                    value={formValue}
                    onChange={handleTyping} // update formValue when the input changes
                    placeholder="Type Message..." />
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        📷
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        className="hidden"
                    />
                    {image && (
                        <p className="text-xs text-white truncate max-w-[120px] mt-1">{image.name}</p> // Show selected image name
                    )}
                </div>
                <button type="submit" className="text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition transform font-medium rounded-full text-sm px-4 py-2 shadow-md">
                    Send
                </button>
            </form >
        </div>
    );
};

export default ChatRoom; // Export the component

