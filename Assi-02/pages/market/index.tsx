import { GetStaticProps } from 'next';
import { MARKET_FUND_CODES } from '@/lib/constants';
import { fetchMultipleFunds, calculateReturn, findNearestNAV, MutualFundData } from '@/lib/api';
import FundList from '@/components/FundList';
import { BarChart3, Clock } from 'lucide-react';

interface MarketPageProps {
  funds: (MutualFundData | null)[];
  lastUpdated: string;
}

// ISR via getStaticProps (revalidate hourly)
export default function MarketPage({ funds, lastUpdated }: MarketPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-semibold mb-6 shadow-sm border border-green-200">
          <BarChart3 className="h-4 w-4 mr-2" />
          Market Overview
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          Market Snapshot
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Real-time market overview of top-performing mutual funds with latest NAV data 
          and 1-month return calculations. Updated every hour.
        </p>
      </div>

      {/* ISR Mode Indicator */}
      <div className="mb-6">
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800 font-medium">
                  <span className="font-semibold">ISR Mode (Pages Router):</span> Market data 
                  regenerates every hour for real-time insights.
                </p>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-1" />
              Last updated: {new Date(lastUpdated).toLocaleString('en-US', {
                dateStyle: 'short',
                timeStyle: 'medium'
              })}
            </div>
          </div>
        </div>
      </div>

      <FundList 
        funds={funds} 
        baseLinkPath="/market/fund"
        showReturns={true}
      />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const funds = await fetchMultipleFunds(MARKET_FUND_CODES);

    return {
      props: {
        funds,
        lastUpdated: new Date().toISOString()
      },
      revalidate: 3600 // 1 hour
    };
  } catch (error) {
    console.error('Error fetching market data:', error);
    return {
      props: {
        funds: [],
        lastUpdated: new Date().toISOString()
      },
      revalidate: 3600
    };
  }
};