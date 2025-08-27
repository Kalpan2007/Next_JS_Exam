import { useState } from 'react';
import { fetchMultipleFunds, MutualFundData } from '@/lib/api';
import SearchBar from '@/components/SearchBar';
import CompareTable from '@/components/CompareTable';
import EmptyState from '@/components/EmptyState';
import { GitCompare, X, Plus, Zap } from 'lucide-react';

// CSR - Client-Side Rendering
export default function MarketComparePage() {
  const [funds, setFunds] = useState<MutualFundData[]>([]);
  const [schemeCodes, setSchemeCodes] = useState<string[]>(['', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddFund = async (query: string, index: number) => {
    if (!/^\d+$/.test(query)) {
      setError('Please enter a valid numeric scheme code.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const codes = [...schemeCodes];
      codes[index] = query;
      setSchemeCodes(codes);

      // Fetch all non-empty codes
      const validCodes = codes.filter(code => code.trim() !== '').map(code => parseInt(code));
      
      if (validCodes.length > 0) {
        const fundData = await fetchMultipleFunds(validCodes);
        const validFunds = fundData.filter(fund => fund !== null) as MutualFundData[];
        setFunds(validFunds);
      } else {
        setFunds([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFund = (index: number) => {
    const codes = [...schemeCodes];
    codes[index] = '';
    setSchemeCodes(codes);

    // Refresh the funds list
    const validCodes = codes.filter(code => code.trim() !== '').map(code => parseInt(code));
    if (validCodes.length > 0) {
      fetchMultipleFunds(validCodes).then(fundData => {
        const validFunds = fundData.filter(fund => fund !== null) as MutualFundData[];
        setFunds(validFunds);
      });
    } else {
      setFunds([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-sm font-semibold mb-6 shadow-sm border border-indigo-200">
          <GitCompare className="h-4 w-4 mr-2" />
          Fund Comparison Tool
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          Compare Mutual Funds
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Compare up to 3 mutual funds side by side. Analyze latest NAV, returns, 
          and key metrics to make informed investment decisions.
        </p>
      </div>

      {/* CSR Mode Indicator */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Zap className="h-5 w-5 text-indigo-600 animate-pulse" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-indigo-800 font-medium">
                <span className="font-semibold">CSR Mode (Pages Router):</span> This page performs 
                real-time client-side data fetching and comparison calculations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 p-8 mb-8 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Plus className="h-5 w-5 mr-2 text-indigo-600" />
          Add Funds to Compare
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {schemeCodes.map((code, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 bg-gray-50 px-3 py-1 rounded-full">
                  Fund {index + 1}
                </h3>
                {code && (
                  <button
                    onClick={() => handleRemoveFund(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                    title="Remove fund"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <SearchBar
                onSearch={(query) => handleAddFund(query, index)}
                placeholder={`Scheme code ${index + 1}`}
                isLoading={isLoading}
              />
              
              {code && (
                <div className="text-xs text-gray-500 font-mono bg-indigo-50 border border-indigo-200 px-3 py-2 rounded-lg">
                  Code: {code}
                </div>
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <p className="text-sm text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 bg-gray-50 inline-block px-4 py-2 rounded-full">
            Try these popular codes: 
            <button 
              onClick={() => handleAddFund('122639', 0)}
              className="text-indigo-600 hover:text-indigo-700 hover:underline ml-2 font-mono font-semibold"
            >
              122639
            </button>
            , 
            <button 
              onClick={() => handleAddFund('120492', 1)}
              className="text-indigo-600 hover:text-indigo-700 hover:underline ml-1 font-mono font-semibold"
            >
              120492
            </button>
            , 
            <button 
              onClick={() => handleAddFund('125497', 2)}
              className="text-indigo-600 hover:text-indigo-700 hover:underline ml-1 font-mono font-semibold"
            >
              125497
            </button>
          </p>
        </div>
      </div>

      {/* Comparison Results */}
      <div className="min-h-96 bg-white/50 backdrop-blur-sm rounded-xl p-6">
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-6 py-3 bg-indigo-100 text-indigo-800 rounded-full shadow-sm">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-800 mr-3"></div>
              Loading fund data for comparison...
            </div>
          </div>
        )}

        {!isLoading && funds.length > 0 && (
          <CompareTable funds={funds} />
        )}

        {!isLoading && funds.length === 0 && schemeCodes.some(code => code !== '') && (
          <EmptyState 
            type="error"
            title="No Funds to Compare"
            description="Please add valid scheme codes to start comparing funds."
            suggestion="Enter at least one valid scheme code in the search fields above."
          />
        )}

        {!isLoading && funds.length === 0 && schemeCodes.every(code => code === '') && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GitCompare className="h-10 w-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Ready to Compare
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Enter scheme codes for up to 3 mutual funds to see a detailed comparison
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full inline-flex">
              <Plus className="h-4 w-4 text-indigo-600" />
              <span>Add your first fund above to get started</span>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}