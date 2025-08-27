import { GetServerSideProps } from 'next';
import { fetchMutualFund, MutualFundData, calculateReturn, findNearestNAV, formatCurrency, formatDate } from '@/lib/api';
import { Calendar, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

interface MarketFundDetailPageProps {
  fund: MutualFundData | null;
  code: string;
  returns: {
    oneMonth: number | null;
    threeMonth: number | null;
    dataNote: string;
  };
}

// SSR via getServerSideProps (dynamic)
export default function MarketFundDetailPage({ fund, code, returns }: MarketFundDetailPageProps) {
  if (!fund) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState 
          type="search"
          title="Fund Not Found"
          description={`No mutual fund found for scheme code: ${code}`}
          suggestion="Please verify the scheme code and try again."
        />
      </div>
    );
  }

  const latestNAV = fund.data[0];

  const ReturnDisplay = ({ value, label }: { value: number | null; label: string }) => {
    if (value === null) {
      return (
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-gray-400 text-sm font-medium">{label}</div>
          <div className="text-gray-500">—</div>
        </div>
      );
    }

    const isPositive = value > 0;
    return (
      <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
        <div className="text-gray-600 text-sm font-medium mb-1">{label}</div>
        <div className={`text-2xl font-bold flex items-center justify-center ${
          isPositive ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-600'
        }`}>
          {isPositive ? (
            <TrendingUp className="h-5 w-5 mr-1" />
          ) : value < 0 ? (
            <TrendingDown className="h-5 w-5 mr-1" />
          ) : null}
          {value > 0 ? '+' : ''}{value.toFixed(2)}%
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* SSR Mode Indicator */}
      <div className="mb-6">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-purple-800">
                <span className="font-semibold">SSR Mode (Pages Router):</span> This page renders 
                on every request with real-time performance calculations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fund Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {fund.meta.scheme_name}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>{fund.meta.fund_house}</span>
              <span>•</span>
              <span>{fund.meta.scheme_category}</span>
              <span>•</span>
              <span>Code: {fund.meta.scheme_code}</span>
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

      {/* Performance Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Trailing Returns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReturnDisplay value={returns.oneMonth} label="1 Month Return" />
          <ReturnDisplay value={returns.threeMonth} label="3 Month Return" />
        </div>
      </div>

      {/* Data Note */}
      {returns.dataNote && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Data Note</h3>
              <p className="text-sm text-blue-800">{returns.dataNote}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent NAV History */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent NAV History (Last 10 entries)
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fund.data.slice(0, 10).map((nav) => (
                <tr key={`${nav.date}-${nav.nav}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(nav.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    {formatCurrency(nav.nav)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const code = params?.code as string;

  if (!code || !/^\d+$/.test(code)) {
    return {
      props: {
        fund: null,
        code: code || '',
        returns: {
          oneMonth: null,
          threeMonth: null,
          dataNote: ''
        }
      }
    };
  }

  try {
    const fund = await fetchMutualFund(code);

    if (!fund) {
      return {
        props: {
          fund: null,
          code,
          returns: {
            oneMonth: null,
            threeMonth: null,
            dataNote: ''
          }
        }
      };
    }

    // Calculate returns
    const currentNAV = fund.data[0];
    const oneMonthDate = new Date();
    oneMonthDate.setMonth(oneMonthDate.getMonth() - 1);
    const threeMonthDate = new Date();
    threeMonthDate.setMonth(threeMonthDate.getMonth() - 3);

    const oneMonthNAV = findNearestNAV(fund.data, oneMonthDate);
    const threeMonthNAV = findNearestNAV(fund.data, threeMonthDate);

    const oneMonth = oneMonthNAV ? calculateReturn(currentNAV.nav, oneMonthNAV.nav) : null;
    const threeMonth = threeMonthNAV ? calculateReturn(currentNAV.nav, threeMonthNAV.nav) : null;

    let dataNote = '';
    if (!oneMonthNAV || !threeMonthNAV) {
      dataNote = 'Some returns calculated using nearest available NAV within ±3 days of target date.';
    }

    return {
      props: {
        fund,
        code,
        returns: {
          oneMonth,
          threeMonth,
          dataNote
        }
      }
    };
  } catch (error) {
    console.error(`Error fetching fund ${code}:`, error);
    return {
      props: {
        fund: null,
        code,
        returns: {
          oneMonth: null,
          threeMonth: null,
          dataNote: ''
        }
      }
    };
  }
};