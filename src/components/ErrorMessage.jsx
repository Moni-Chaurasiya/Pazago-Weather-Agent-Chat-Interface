import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

function ErrorMessage({ error, onRetry }) {
  return (
    <div className="flex justify-center animate-fade-in">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-md">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
              Something went wrong
            </h4>
            <p className="text-sm text-red-600 dark:text-red-300">
              {error}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-2 inline-flex items-center text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;