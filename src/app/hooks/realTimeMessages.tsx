// import { useState, useEffect, useRef } from 'react';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { db } from '../lib/firebaseConfig';
// import { LeftChatBubble, RightChatBubble } from '../components/ChatBubble';
// import { format } from 'date-fns';
// interface RealTimeMessagesProps {
//     user: any;
// }

// const realTimeMessages: React.FC<RealTimeMessagesProps> = ({ user }) => { // display messages in real time
//     const [messages, setMessages] = useState<any[]>([]);
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     useEffect(() => { // set up a listener for real-time updates
//         const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
//             const fetchedMessages = snapshot.docs.map((doc) => doc.data());
//             setMessages(fetchedMessages);
//         });

//         return () => unsubscribe(); // unsubscribe when the component unmounts
//     }, []);
//     useEffect(() => { // scroll to the bottom of the messages when new messages are added
//         if (messagesEndRef.current) { // check if the ref is available
//             messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     }, [messages]); // re-run the effect when messages change
//     return (
//         <div className='flex flex-col gap-2 flex-1 overflow-auto p-4'> {/* container for messages */}
//             {messages
//                 .sort((a, b) => a.createdAt - b.createdAt) // sort messages by date
//                 .map((message) => ( // display each message
//                     <div key={message.createdAt}
//                         className={`flex gap-2 items-center ${message.uid === user.uid ? 'justify-end' : 'justify-start'}`}
//                     >
//                         {message.uid !== user.uid && (<LeftChatBubble name={message.displayName} message={message.message} createdAt={format(message.createdAt.toDate(), 'MMM dd, yyyy hh:mm a')} img={message.photoURL} />)} {/* display user photo */}
//                         {message.uid === user.uid && (<RightChatBubble message={message.message} createdAt={format(message.createdAt.toDate(), 'MMM dd, yyyy hh:mm a')} img={message.photoURL} />)} {/* display user photo */}
//                     </div>
//                 ))}
//             <div ref={messagesEndRef} /> {/* ref to scroll to the bottom */}
//         </div>
//     )
// };

// export default realTimeMessages; // export the RealTimeMessages component


// updated (also im just commenting the previous so we can go back if we face any issue)
import { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import { LeftChatBubble, RightChatBubble } from '../components/ChatBubble';
import { format } from 'date-fns';
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
                        {message.uid !== user.uid && (
                            <LeftChatBubble
                                name={message.displayName}
                                message={message.message}
                                imageUrl={message.imageUrl} // pass imageUrl to bubble
                                createdAt={
                                    message.createdAt?.toDate
                                        ? format(message.createdAt.toDate(), 'MMM dd, yyyy hh:mm a')
                                        : "Just now"
                                }
                                
                                img={message.photoURL}
                            />
                        )} {/* display user photo */}
                        {message.uid === user.uid && (
                            <RightChatBubble
                                message={message.message}
                                imageUrl={message.imageUrl} // pass imageUrl to bubble
                                createdAt={
                                    message.createdAt?.toDate
                                        ? format(message.createdAt.toDate(), 'MMM dd, yyyy hh:mm a')
                                        : "Just now"
                                }
                                
                                img={message.photoURL}
                            />
                        )} {/* display user photo */}
                    </div>
                ))}
            <div ref={messagesEndRef} /> {/* ref to scroll to the bottom */}
        </div>
    )
};

export default realTimeMessages; // export the RealTimeMessages component
