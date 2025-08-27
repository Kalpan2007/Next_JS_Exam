import { AlertCircle, Search, TrendingUp } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  suggestion?: string;
  type?: 'search' | 'error' | 'no-data';
}

export default function EmptyState({ 
  title, 
  description, 
  suggestion,
  type = 'no-data'
}: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search className="h-12 w-12 text-gray-400" />;
      case 'error':
        return <AlertCircle className="h-12 w-12 text-red-400" />;
      default:
        return <TrendingUp className="h-12 w-12 text-gray-400" />;
    }
  };

  const getDefaultContent = () => {
    switch (type) {
      case 'search':
        return {
          title: 'No Results Found',
          description: 'We couldn\'t find any funds matching your search criteria.',
          suggestion: 'Try searching with a different scheme code or check if the code is correct.'
        };
      case 'error':
        return {
          title: 'Something went wrong',
          description: 'We encountered an error while fetching the fund data.',
          suggestion: 'Please check your internet connection and try again.'
        };
      default:
        return {
          title: 'No Data Available',
          description: 'There\'s no fund data to display at the moment.',
          suggestion: 'Please try again later or contact support if the issue persists.'
        };
    }
  };

  const defaultContent = getDefaultContent();

  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        {getIcon()}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title || defaultContent.title}
      </h3>
      
      <p className="text-gray-600 mb-4 max-w-md mx-auto">
        {description || defaultContent.description}
      </p>
      
      {(suggestion || defaultContent.suggestion) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-blue-800 text-sm">
            💡 {suggestion || defaultContent.suggestion}
          </p>
        </div>
      )}
    </div>
  );
}