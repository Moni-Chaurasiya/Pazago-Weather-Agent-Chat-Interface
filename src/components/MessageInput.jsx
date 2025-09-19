
import React, { useState, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useWeatherApi } from '../hooks/useWeatherApi';

function MessageInput() {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  const { isLoading } = useChat();
  const { sendMessage } = useWeatherApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;
    
    setMessage('');
    resetTextareaHeight();
    
    await sendMessage(trimmedMessage);
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const resetTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 resize-none bg-transparent px-4 py-3 pr-12 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none focus:ring-0"
          />
          
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="absolute right-2 p-2 bg-black dark:bg-white text-white dark:text-black rounded-md transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
