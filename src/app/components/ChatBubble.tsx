
interface ChatBubbleProps {
    name?: string;
    message: string;
    createdAt: string;
    img: string;
}

export const LeftChatBubble: React.FC<ChatBubbleProps> = ({ name, message, createdAt, img }) => {
    return (
        <div className='flex items-start gap-2.5'>
            <img className='w-8 h-8 rounded-full' src={img} alt='Jese image' />
            <div className='flex flex-col gap-1 w-full max-w-[320px]'>
                {/* Name and date */}
                <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                    <span className='text-sm font-semibold text-gray-900 dark:text-white'>{name}</span>
                    <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>{createdAt}</span>
                </div>
                {/* Message */}
                <div className='inline-flex flex-col leading-1.5 p-4 rounded-e-xl rounded-es-xl rounded-tl-xl rounded-bl-xl rounded-br-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10' style={{ width: 'fit-content' }}>
                    <p className='text-sm font-normal text-gray-900 dark:text-white break-words '>{message}</p>
                </div>
            </div>

        </div>
    );
}

export const RightChatBubble: React.FC<ChatBubbleProps> = ({ message, createdAt, img }) => {
    return (
        <div className='flex items-start gap-2.5 justify-end'>
            {/* Image */}
            <div className='flex flex-col gap-1 w-full max-w-[320px] items-end'>
                <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                    <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>{createdAt}</span>
                </div>
                <div className='flex flex-col leading-1.5 p-4 text-white rounded-tl-xl rounded-bl-xl rounded-br-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10' style={{ width: 'fit-content' }}>
                    <p className='text-sm font-normal text-right'>{message}</p>
                </div>
            </div>
            <img className='w-8 h-8 rounded-full ml-2' src={img} alt='User image' />
        </div>
    );
}

