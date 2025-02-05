import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig';

const realTimeMessages = () => {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => doc.data());
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h2>Messages</h2>
            {messages
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((message) => (
                    <div key={message.createdAt}>
                        <img src={message.photoURL} alt={message.displayName} />
                        <p>{message.displayName}: {message.message}</p>
                    </div>
                ))}
        </div>
    )
};

export default realTimeMessages;