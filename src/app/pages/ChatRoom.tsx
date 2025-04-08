import { signOutUser } from "../lib/firebaseAuth";
import { addMessage } from "../lib/firestore";
import { useState } from "react";
import RealTimeMessages from "../hooks/realTimeMessages";
import Loading from "./Loading";

interface ChatRoomProps {
    user: any;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ user }) => {
    const [formValue, setFormValue] = useState("");
    if (!user) return <Loading />; // show loading message if user is not signed in

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent the form from refreshing the page
        if (!formValue.trim()) return; // don't send empty
        await addMessage(formValue, user.uid, user.photoURL, user.displayName);
        setFormValue(""); // clear the input field
    };

    return (
        <div>
            <h1>Welcome to the chat room, {user.displayName}</h1>
            <RealTimeMessages user={user} /> {/* display messages in real time */}
            <form onSubmit={handleSubmit} className='flex p-4 gap-4 justify-between items-center'> {/* form for sending messages */}
                <div className="relative flex-1">
                    <input className="block w-full p-4 ps-10 text-sm focus:ring-0 focus:outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)} // update formValue when the input changes
                        placeholder="Type Message..." required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Send
                    </button>
                </div>
                <div>
                    <button
                        onClick={signOutUser}
                        className="button button-signout text-small"
                    >
                        Sign out
                    </button>
                </div>
                {/* </div> */}
            </form >
        </div >
    );
}

export default ChatRoom;
