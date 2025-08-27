'use client';

import { useState } from 'react';
import { fetchMutualFund } from '@/lib/api';
import SearchBar from '@/components/SearchBar';
import FundDetail from '@/components/FundDetail';
import EmptyState from '@/components/EmptyState';
import { Search, Zap } from 'lucide-react';
import type { MutualFundData } from '@/lib/api';

// CSR - Client-Side Rendering
export default function LearnToolsPage() {
  const [fund, setFund] = useState<MutualFundData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Validate scheme code format
      if (!/^\d+$/.test(query)) {
        throw new Error('Please enter a valid numeric scheme code.');
      }

      const fundData = await fetchMutualFund(query);
      if (!fundData) {
        throw new Error(`No fund found for scheme code: ${query}`);
      }

      setFund(fundData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setFund(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFund(null);
    setError(null);
    setHasSearched(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
          <Search className="h-4 w-4 mr-2" />
          Fund Search Tools
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Find Any Mutual Fund
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Search for any mutual fund using its scheme code. Get instant access to 
          detailed fund information, latest NAV, and recent performance data.
        </p>
      </div>

      {/* CSR Mode Indicator */}
      <div className="mb-6">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Zap className="h-5 w-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-orange-800">
                <span className="font-semibold">CSR Mode:</span> This page performs client-side 
                rendering with real-time data fetching when you search.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="max-w-2xl mx-auto">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Enter mutual fund scheme code (e.g., 122639)"
            isLoading={isLoading}
            onClear={handleClear}
          />
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Try these popular scheme codes: 
              <span className="font-mono text-blue-600">122639</span>, 
              <span className="font-mono text-blue-600 ml-2">120492</span>, 
              <span className="font-mono text-blue-600 ml-2">125497</span>
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="min-h-96">
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-800 mr-2"></div>
              Searching for fund data...
            </div>
          </div>
        )}

        {error && (
          <EmptyState 
            type="error"
            title="Search Error"
            description={error}
            suggestion="Please check the scheme code and try again. Make sure it contains only numbers."
          />
        )}

        {fund && (
          <FundDetail 
            fund={fund} 
            showRecentNAVs={true}
            maxEntries={15}
          />
        )}

        {!isLoading && !error && !fund && hasSearched && (
          <EmptyState 
            type="search"
            title="No Results Found"
            description="We couldn't find any fund matching your search."
            suggestion="Please verify the scheme code and try again."
          />
        )}

        {!hasSearched && !isLoading && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ready to Search
            </h3>
            <p className="text-gray-500">
              Enter a mutual fund scheme code above to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}