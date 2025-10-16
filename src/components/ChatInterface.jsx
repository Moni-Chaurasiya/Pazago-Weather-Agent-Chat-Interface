import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import SearchBar from './SearchBar';
import { useChat } from '../context/ChatContext';

function ChatInterface() {
  const { searchQuery } = useChat();

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl">
      {/* Chat Header */}
      <ChatHeader />
      
      {/* Search Bar (shows when searching) */}
      {searchQuery && <SearchBar />}
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <MessageList />
      </div>
      
      {/* Message Input */}
      <MessageInput />
    </div>
  );
}

export default ChatInterface;