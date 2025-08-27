import React from 'react';

interface EmptyStateProps {
  message?: string;
  suggestion?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No results found',
  suggestion = 'Try searching with a different scheme code'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
        <p className="mb-2 text-lg font-medium text-gray-600">{message}</p>
        <p className="text-sm text-gray-500">{suggestion}</p>
      </div>
    </div>
  );
};

export default EmptyState;
