import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import EmojiPicker from 'emoji-picker-react';

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    };

    const handleEmojiClick = (event, emojiObject) => {
        console.log('Emoji Object:', emojiObject);
    };
    
    
    

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                </button>
                <button type='button' onClick={() => setShowEmojiPicker(!showEmojiPicker)} className='absolute inset-y-0 end-8'>
                    😊
                </button>
                {showEmojiPicker && (
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        disableSearchBar
                        disableSkinTonePicker
                        groupVisibility={{
                            recently_used: false
                        }}
                    />
                )}
            </div>
        </form>
    );
};

export default MessageInput;
