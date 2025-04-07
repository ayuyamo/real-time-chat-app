import { useState, useEffect } from "react";
import { signOutUser } from "../lib/firebaseAuth";
import { addMessage, updateTypingStatus } from "../lib/firestore";
import RealTimeMessages from "./RealTimeMessages";
import Loading from "./Loading";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

interface ChatRoomProps {
    user: any;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ user }) => {
    const [formValue, setFormValue] = useState("");
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    if (!user) return <Loading />;

    useEffect(() => {
        const q = query(
            collection(db, "typingStatus"),
            where("isTyping", "==", true),
            where("lastUpdated", ">", new Date(Date.now() - 3000))
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const users: string[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.uid !== user.uid && data.displayName) {
                    users.push(data.displayName);
                }
            });
            console.log("Current typing users:", users);
            setTypingUsers(users);
        });

        return () => {
            unsubscribe();
            if (typingTimeout) clearTimeout(typingTimeout);
            updateTypingStatus(user.uid, user.displayName, false);
        };
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue(e.target.value);
        
        if (e.target.value.trim().length > 0) {
            updateTypingStatus(user.uid, user.displayName, true);
            
            if (typingTimeout) clearTimeout(typingTimeout);
            
            const timeout = setTimeout(() => {
                updateTypingStatus(user.uid, user.displayName, false);
            }, 2000);
            
            setTypingTimeout(timeout);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formValue.trim()) return;
        
        await updateTypingStatus(user.uid, user.displayName, false);
        await addMessage(formValue, user.uid, user.photoURL, user.displayName);
        setFormValue("");
        
        if (typingTimeout) {
            clearTimeout(typingTimeout);
            setTypingTimeout(null);
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Welcome, {user.displayName}</h1>
                <button 
                    onClick={signOutUser}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Sign out
                </button>
            </div>
            
            <RealTimeMessages user={user} />
            
            <div className="h-6 mb-2 text-sm text-gray-500 italic">
                {typingUsers.length > 0 && (
                    <div className="flex items-center gap-1">
                        <span className="flex space-x-1">
                            {[...Array(3)].map((_, i) => (
                                <span 
                                    key={i}
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                />
                            ))}
                        </span>
                        {typingUsers.join(", ")} typing...
                    </div>
                )}
            </div>
            
            <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
                <input
                    className="flex-1 p-2 border rounded text-black"
                    value={formValue}
                    onChange={handleChange}
                    placeholder="Type a message"
                />
                <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatRoom;