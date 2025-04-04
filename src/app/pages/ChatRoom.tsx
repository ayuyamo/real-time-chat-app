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
            <form onSubmit={handleSubmit}> {/* form for sending messages */}
                <input
                    className="message-input text-black"
                    value={formValue} // bind the input value to the formValue state
                    onChange={(e) => setFormValue(e.target.value)} // update formValue when the input changes
                    placeholder="Type a message"
                />
                <div className="button-container">
                    <button 
                        type="submit"
                        className="button button-send"
                    >
                        Send
                    </button>
                    <button
                        onClick={signOutUser}
                        className="button button-signout"
                    >
                        Sign out
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatRoom;
