'use client';
import { useAuth } from "../components/useAuth";
import { signOutUser } from "../components/firebaseAuth";
import { addMessage } from "../components/firestore";
import { useState } from "react";
import RealTimeMessages from "../components/realTimeMessages";

export default function ChatRoom() {
    const user = useAuth();
    const [formValue, setFormValue] = useState("");
    if (!user) return <div>Loading...</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addMessage(formValue, user.uid, user.photoURL, user.displayName);
        setFormValue("");
    };

    return (
        <div>
            <h1>Welcome to the chat room, {user.displayName}</h1>
            <RealTimeMessages />
            <form onSubmit={handleSubmit}>
                <input className="message-input text-black"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>
            <button onClick={signOutUser}>Sign out</button>
        </div>
    );
}