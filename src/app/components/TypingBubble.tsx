import React, { useRef } from 'react';
import { useEffect } from 'react';
interface TypingBubbleProps {
    img: string[];
}

export const TypingBubble: React.FC<TypingBubbleProps> = ({ img }) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Scroll to the bottom when the component mounts or updates
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [img]); // Dependency array to trigger effect on img change

    return (
        <div className="flex items-center pl-4 space-x-3 text-gray-600 text-sm">
            <div className='flex -space-x-4'>
                {img.slice(0, 3).map((src, index) => (
                    <div key={index} className="mb-4">
                        <img
                            className="w-8 h-8 rounded-full shadow-md shadow-gray-600 outline-none"
                            src={src}
                            alt={`User ${index}`}
                        />
                    </div>
                ))}

                {img.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 text-xs font-medium flex items-center justify-center shadow-md shadow-gray-600 z-0">
                        +{img.length - 3}
                    </div>
                )}
            </div>
            <div className="flex h-full items-center space-x-1">
                <div className="h-5 animate-bounce  animation-delay-200">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                </div>
                <div className="h-5 animate-bounce animation-delay-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                </div>
                <div className="h-5 animate-bounce animation-delay-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                </div>
            </div>
            <div ref={bottomRef} /> {/* Ref to scroll to the bottom */}
        </div>
    );
}
