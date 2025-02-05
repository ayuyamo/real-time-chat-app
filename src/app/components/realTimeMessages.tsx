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
            {messages.map((message, index) => (
                <div key={index}>
                    <strong>{message.displayName}</strong>: {message.message}
                </div>
            ))}
        </div>
    )
};

export default realTimeMessages;