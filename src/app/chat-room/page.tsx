'use client';
import { useAuth } from "../components/useAuth";
import { signOutUser } from "../components/firebaseAuth";
import { addMessage } from "../components/firestore";
import { useState } from "react";
import RealTimeMessages from "../components/realTimeMessages";

export default function ChatRoom() {
    const user = useAuth(); // get the current user
    const [formValue, setFormValue] = useState("");
    if (!user) return <div>Loading...</div>; // show loading message if user is not signed in

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent the form from refreshing the page
        if (!formValue.trim()) return; // don't send empty
        await addMessage(formValue, user.uid, user.photoURL, user.displayName);
        setFormValue(""); // clear the input field
    };

    return (
        <div>
            <h1>Welcome to the chat room, {user.displayName}</h1>
            <RealTimeMessages /> {/* display messages in real time */}
            <form onSubmit={handleSubmit}> {/* form for sending messages */}
                <input className="message-input text-black"
                    value={formValue} // bind the input value to the formValue state
                    onChange={(e) => setFormValue(e.target.value)} // update formValue when the input changes
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>
            <button onClick={signOutUser}>Sign out</button> {/* sign out button */}
        </div>
    );
}