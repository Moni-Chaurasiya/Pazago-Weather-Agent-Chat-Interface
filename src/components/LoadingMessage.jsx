import React from 'react';
import { Bot } from 'lucide-react';

function LoadingMessage() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="flex items-start space-x-2 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        {/* Avatar */}
        <div className="flex-shrink-0 mr-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <Bot size={16} />
          </div>
        </div>

        {/* Loading Bubble */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg rounded-bl-sm px-4 py-3 shadow-sm">
          <div className="flex items-center space-x-1">
            {/* Typing Animation */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              Weather agent is thinking...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingMessage;