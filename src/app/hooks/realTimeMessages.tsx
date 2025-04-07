import { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import { LeftChatBubble, RightChatBubble } from './ChatBubble';
import { format } from 'date-fns';

interface RealTimeMessagesProps {
    user: any;
}

const RealTimeMessages: React.FC<RealTimeMessagesProps> = ({ user }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const q = query(
            collection(db, 'messages'),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.() || null
            }));
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className='flex flex-col gap-2 flex-1 overflow-auto p-4'>
            {messages
                .filter(message => message.createdAt)
                .map((message) => (
                    <div 
                        key={message.id || message.createdAt?.getTime()} 
                        className={`flex gap-2 items-center ${message.uid === user.uid ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.uid !== user.uid ? (
                            <LeftChatBubble 
                                name={message.displayName} 
                                message={message.message} 
                                createdAt={message.createdAt ? format(message.createdAt, 'MMM dd, yyyy hh:mm a') : ''} 
                                img={message.photoURL} 
                            />
                        ) : (
                            <RightChatBubble 
                                message={message.message} 
                                createdAt={message.createdAt ? format(message.createdAt, 'MMM dd, yyyy hh:mm a') : ''} 
                                img={message.photoURL} 
                            />
                        )}
                    </div>
                ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default RealTimeMessages;