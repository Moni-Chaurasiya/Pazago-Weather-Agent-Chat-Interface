
import React from 'react';
import { User, Bot, Cloud, Check, CheckCheck } from 'lucide-react';
import { formatTime } from '../utils/dateUtils';
import { highlightSearchText } from '../utils/searchUtils';

function Message({ message, searchQuery }) {
  const isUser = message.role === 'user';
  const isDelivered = message.status === 'delivered';
  const isRead = message.status === 'read';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in mb-6`}>
      <div className={`flex max-w-2xl md:max-w-3xl lg:max-w-4xl ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isUser 
              ? 'bg-gray-100 text-black dark:bg-gray-600 dark:text-white  ' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300'
          }`}>
            {isUser ? <User size={18} /> : <Bot size={18} />}
          </div>
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} flex-1`}>
          {/* Message Bubble */}
          <div className={`relative px-5 py-3 rounded-2xl max-w-full ${
            isUser
              ? 'bg-gray-100 text-black dark:bg-gray-600 dark:text-white rounded-br-md'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-md'
          } shadow-sm`}>
            {/* Message Text */}
            <div className="text-sm leading-relaxed break-words whitespace-pre-wrap">
              {searchQuery 
                ? highlightSearchText(message.content, searchQuery)
                : message.content
              }
            </div>

            {/* Weather Icon for weather-related responses */}
            {!isUser && message.content.toLowerCase().includes('weather') && (
              <Cloud className="inline-block w-4 h-4 ml-1 opacity-70" />
            )}
          </div>

          {/* Message Footer */}
          <div className={`flex items-center mt-2 gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Timestamp */}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTime(message.timestamp)}
            </span>

            {/* Delivery Status (only for user messages) */}
            {isUser && (
              <div className="text-gray-400">
                {isRead ? (
                  <CheckCheck size={14} className="text-blue-400" />
                ) : isDelivered ? (
                  <Check size={14} />
                ) : (
                  <div className="w-3.5 h-3.5 border border-gray-400 rounded-full animate-pulse" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;