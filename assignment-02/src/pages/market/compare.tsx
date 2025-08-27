'use client';

import { useState } from 'react';
import { MFScheme } from '@/lib/mfapi';
import SearchBar from '@/components/SearchBar';
import CompareTable from '@/components/CompareTable';
import EmptyState from '@/components/EmptyState';

export default function ComparePage() {
  const [funds, setFunds] = useState<MFScheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query) return;
    if (funds.length >= 3) {
      setError('Maximum 3 funds can be compared');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.mfapi.in/mf/${query}`);
      if (!response.ok) {
        throw new Error('Fund not found');
      }
      const data = await response.json();
      setFunds(prev => [...prev, data]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFunds([]);
    setError(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 border border-gray-100">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Compare Funds</h1>
          <p className="text-gray-600">
            Compare up to three mutual funds side by side
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 border border-gray-100">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Enter scheme code to compare..."
              />
            </div>
            {funds.length > 0 && (
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
              >
                <span>Reset</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-center">
              {error}
            </div>
          )}

          {funds.length > 0 && !loading && (
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <CompareTable funds={funds} />
            </div>
          )}

          {!funds.length && !loading && !error && (
            <EmptyState
              message="No funds selected for comparison"
              suggestion="Enter a scheme code to start comparing"
            />
          )}

          {funds.length > 0 && funds.length < 3 && !loading && (
            <div className="text-center bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-blue-700 font-medium">
                You can add {3 - funds.length} more fund{3 - funds.length > 1 ? 's' : ''} to compare
              </p>
              <p className="text-blue-600 text-sm mt-1">
                Enter another scheme code to continue comparison
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
