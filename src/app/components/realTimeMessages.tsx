import { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig';

const realTimeMessages = () => { // display messages in real time
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
        <div>
            <h2>Messages</h2>
            {messages
                .sort((a, b) => a.createdAt - b.createdAt) // sort messages by date
                .map((message) => ( // display each message
                    <div key={message.createdAt}> {/* use createdAt as the key */}
                        <img src={message.photoURL} alt={message.displayName} /> {/* display user photo */}
                        <p>{message.displayName}: {message.message}</p> {/* display message */}
                    </div>
                ))}
            <div ref={messagesEndRef} /> {/* ref to scroll to the bottom */}
        </div>
    )
};

export default realTimeMessages; // export the RealTimeMessages component