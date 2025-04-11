

interface TypingBubbleProps {
    img: string[];
}

export const TypingBubble: React.FC<TypingBubbleProps> = ({ img }) => {
    return (
        <div className="flex p-4 items-center space-x-3 text-gray-600 text-sm">
            <div className='flex -space-x-4'>
                {/* {img.map((src, index) => (
                    <div key={index} className="mb-4">
                        <img className="w-8 h-8 rounded-full shadow-md shadow-gray-600 outline-none"
                            src={src}
                            alt={`User ${index}`}
                            style={{ zIndex: img.length - index }}
                        />
                    </div>
                ))} */}
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
        </div>
    );
}
