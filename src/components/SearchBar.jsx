import React from 'react';
import { Search } from 'lucide-react';
import { useChat } from '../context/ChatContext';

function SearchBar() {
  const { searchQuery,  filteredMessages } = useChat();

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2">
      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
        <span className="text-sm text-yellow-700 dark:text-yellow-300">
          Search mode: {filteredMessages.length} result{filteredMessages.length !== 1 ? 's' : ''} for "{searchQuery}"
        </span>
      </div>
    </div>
  );
}

export default SearchBar;