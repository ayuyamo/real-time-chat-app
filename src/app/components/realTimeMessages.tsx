import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig';

const realTimeMessages = () => { // display messages in real time
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => { // set up a listener for real-time updates
        const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => doc.data());
            setMessages(fetchedMessages);
        });

        return () => unsubscribe(); // unsubscribe when the component unmounts
    }, []);

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
        </div>
    )
};

export default realTimeMessages; // export the RealTimeMessages component