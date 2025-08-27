"use client";

import { useState } from "react";
import SearchBar from "../../../components/SearchBar";
import FundSummaryCard from "../../../components/FundSummaryCard";
import EmptyState from "../../../components/EmptyState";
import { MFScheme } from "../../../lib/mfapi";
import { getLatestNAV } from "../../../lib/returns";

export default function ToolsPage() {
  const [fund, setFund] = useState<MFScheme | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(code: string) {
    if (!code.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.mfapi.in/mf/${code}`);
      if (!response.ok) {
        throw new Error('Fund not found');
      }
      const data = await response.json();
      setFund(data);
    } catch (err) {
      setError((err as Error).message);
      setFund(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white-900 mb-4">Fund Tools</h1>
        <p className="text-gray-600 mb-6">
          Search for any mutual fund by entering its scheme code
        </p>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Enter scheme code..." />

      {loading && (
        <div className="text-center text-gray-600">Loading...</div>
      )}

      {error && (
        <EmptyState
          message={error}
          suggestion="Please try another scheme code"
        />
      )}

      {fund && !loading && !error && (
        <div className="mt-8">
          <FundSummaryCard
            schemeCode={fund.scheme_code}
            schemeName={fund.scheme_name}
            latestNAV={getLatestNAV(fund.data).nav}
            latestDate={getLatestNAV(fund.data).date}
            useAppRouter={true}
          />
        </div>
      )}
    </div>
  );
}
