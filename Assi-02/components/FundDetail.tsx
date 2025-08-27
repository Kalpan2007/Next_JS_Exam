import { MutualFundData, formatCurrency, formatDate } from '@/lib/api';
import { TrendingUp, Calendar, Building, Tag, BarChart } from 'lucide-react';

interface FundDetailProps {
  fund: MutualFundData;
  showRecentNAVs?: boolean;
  maxEntries?: number;
}

export default function FundDetail({ fund, showRecentNAVs = true, maxEntries = 30 }: FundDetailProps) {
  const latestNAV = fund.data[0];
  const recentNAVs = fund.data.slice(0, maxEntries);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {fund.meta.scheme_name}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-1" />
                {fund.meta.fund_house}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                {fund.meta.scheme_category}
              </div>
              <div className="flex items-center">
                <BarChart className="h-4 w-4 mr-1" />
                {fund.meta.scheme_type}
              </div>
            </div>
          </div>
          
          <div className="text-center lg:text-right">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {formatCurrency(latestNAV.nav)}
            </div>
            <div className="flex items-center text-gray-600 justify-center lg:justify-end">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(latestNAV.date)}
            </div>
          </div>
        </div>
      </div>

      {/* Recent NAVs Table */}
      {showRecentNAVs && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent NAV History (Last {recentNAVs.length} entries)
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NAV (₹)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentNAVs.map((nav, index) => {
                  const previousNav = recentNAVs[index + 1];
                  let change = 0;
                  let changePercent = 0;
                  
                  if (previousNav) {
                    const current = parseFloat(nav.nav);
                    const previous = parseFloat(previousNav.nav);
                    change = current - previous;
                    changePercent = (change / previous) * 100;
                  }

                  return (
                    <tr key={`${nav.date}-${nav.nav}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(nav.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                        {formatCurrency(nav.nav)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        {index === recentNAVs.length - 1 ? (
                          <span className="text-gray-400">—</span>
                        ) : (
                          <span className={`font-medium ${
                            change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {change > 0 ? '+' : ''}{change.toFixed(4)} ({changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%)
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}