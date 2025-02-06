import { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

interface RealTimeMessagesProps {
    user: any;
}

const realTimeMessages: React.FC<RealTimeMessagesProps> = ({ user }) => { // display messages in real time
    const [messages, setMessages] = useState<any[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => { // set up a listener for real-time updates
        const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => doc.data());
            setMessages(fetchedMessages);
        });

        return () => unsubscribe(); // unsubscribe when the component unmounts
    }, []);
    useEffect(() => { // scroll to the bottom of the messages when new messages are added
        if (messagesEndRef.current) { // check if the ref is available
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]); // re-run the effect when messages change
    return (
        <div className='flex flex-col gap-2 flex-1 overflow-auto p-4'> {/* container for messages */}
            {messages
                .sort((a, b) => a.createdAt - b.createdAt) // sort messages by date
                .map((message) => ( // display each message
                    <div key={message.createdAt}
                        className={`flex gap-2 items-center ${message.uid === user.uid ? 'justify-end' : 'justify-start'}`}
                    >
                        <img src={message.photoURL} alt={message.displayName} /> {/* display user photo */}
                        <p>{message.displayName}: {message.message}</p> {/* display message */}
                    </div>
                ))}
            <div ref={messagesEndRef} /> {/* ref to scroll to the bottom */}
        </div>
    )
};

export default realTimeMessages; // export the RealTimeMessages component