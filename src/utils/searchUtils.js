import React from 'react';

export function highlightSearchText(text, searchQuery) {
  if (!searchQuery || !text) return text;

  const regex = new RegExp(`(${searchQuery})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === searchQuery.toLowerCase()) {
      return React.createElement(
        'span',
        {
          key: index,
          className: 'bg-yellow-200 dark:bg-yellow-800 px-1 rounded'
        },
        part
      );
    }
    return part;
  });
}

export function searchMessages(messages, query) {
  if (!query.trim()) return [];
  const searchTerm = query.toLowerCase();
  return messages.filter((message) =>
    message.content.toLowerCase().includes(searchTerm)
  );
}
