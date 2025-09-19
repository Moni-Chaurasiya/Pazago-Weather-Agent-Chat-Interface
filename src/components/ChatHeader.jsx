import React, { useState } from 'react';
import { Cloud, Sun, Moon, Search, Trash2, Download, X } from 'lucide-react';
import { useTheme } from './Theme/ThemeProvider';
import { useChat } from '../context/ChatContext';
import { exportChatAsText } from '../utils/exportUtils';

function ChatHeader() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { messages, clearChat, searchQuery, setSearchQuery } = useChat();
  const [showSearch, setShowSearch] = useState(false);

  const handleExport = () => {
    if (messages.length === 0) {
      alert('No messages to export!');
      return;
    }
    exportChatAsText(messages);
  };

  const handleClearChat = () => {
    if (messages.length === 0) {
      alert('Chat is already empty!');
      return;
    }
    
    if (window.confirm('Are you sure you want to clear all messages?')) {
      clearChat();
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between p-4">
   
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Cloud className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Weather Agent
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ask me about weather anywhere
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
      
          <button
            onClick={handleSearchToggle}
            className="p-2 text-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Search messages"
          >
            {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

    
          <button
            onClick={handleExport}
            className="p-2 text-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Export chat history"
          >
            <Download className="w-5 h-5" />
          </button>

          <button
            onClick={handleClearChat}
            className="p-2 text-gray-200 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 text-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="px-4 pb-4">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            autoFocus
          />
        </div>
      )}
    </div>
  );
}

export default ChatHeader;