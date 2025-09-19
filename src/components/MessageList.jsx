import React, { useEffect, useRef } from 'react';
import Message from './Message';
import LoadingMessage from './LoadingMessage';
import ErrorMessage from './ErrorMessage';
import { useChat } from '../context/ChatContext';

function MessageList() {
  const { messages, isLoading, error, searchQuery, filteredMessages } = useChat();
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!searchQuery) {
      scrollToBottom();
    }
  }, [messages, isLoading, searchQuery]);

  // Determine which messages to show
  const displayMessages = searchQuery ? filteredMessages : messages;

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
    >
      {/* Welcome Message */}
      {messages.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Welcome to Weather Agent! 🌤️
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Ask me about the weather in any city. For example:
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                "What's the weather in London?"
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                "Will it rain tomorrow in Delhi?"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Info */}
      {searchQuery && (
        <div className="text-center py-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredMessages.length > 0 
              ? `Found ${filteredMessages.length} message${filteredMessages.length !== 1 ? 's' : ''} matching "${searchQuery}"`
              : `No messages found for "${searchQuery}"`
            }
          </p>
        </div>
      )}

      {/* Messages */}
      {displayMessages.map((message) => (
        <Message 
          key={message.id} 
          message={message}
          searchQuery={searchQuery}
        />
      ))}

      {/* Loading Message */}
      {isLoading && <LoadingMessage />}

      {/* Error Message */}
      {error && <ErrorMessage error={error} />}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;