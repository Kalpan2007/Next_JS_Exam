import { LEARN_FUND_CODES } from '@/lib/constants';
import { fetchMultipleFunds } from '@/lib/api';
import FundList from '@/components/FundList';

// ISR - Incremental Static Regeneration (revalidate daily)
export const revalidate = 86400; // 24 hours

export default async function LearnFundsPage() {
  const funds = await fetchMultipleFunds(LEARN_FUND_CODES);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Curated Mutual Funds
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our carefully selected portfolio of high-performing mutual funds. 
          Data refreshes daily to provide you with the most current NAV information.
        </p>
      </div>

      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">ISR Mode:</span> This page uses Incremental Static Regeneration, 
                updating fund data every 24 hours for optimal performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FundList 
        funds={funds} 
        baseLinkPath="/learn/fund"
        showReturns={true}
      />
    </div>
  );
}