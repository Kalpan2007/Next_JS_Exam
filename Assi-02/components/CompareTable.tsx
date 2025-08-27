import { MutualFundData, formatCurrency, formatDate, calculateReturn, findNearestNAV } from '@/lib/api';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CompareTableProps {
  funds: MutualFundData[];
}

export default function CompareTable({ funds }: CompareTableProps) {
  if (funds.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No funds selected for comparison</p>
      </div>
    );
  }

  const calculateTrailingReturn = (fund: MutualFundData, months: number) => {
    if (fund.data.length === 0) return null;
    
    const currentNAV = fund.data[0];
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() - months);
    
    const pastNAV = findNearestNAV(fund.data, targetDate);
    if (!pastNAV) return null;
    
    return calculateReturn(currentNAV.nav, pastNAV.nav);
  };

  const ReturnCell = ({ returnValue }: { returnValue: number | null }) => {
    if (returnValue === null) return <span className="text-gray-400">—</span>;
    
    const isPositive = returnValue > 0;
    return (
      <div className={`flex items-center justify-end font-medium ${
        isPositive ? 'text-green-600' : returnValue < 0 ? 'text-red-600' : 'text-gray-600'
      }`}>
        {isPositive ? (
          <TrendingUp className="h-4 w-4 mr-1" />
        ) : returnValue < 0 ? (
          <TrendingDown className="h-4 w-4 mr-1" />
        ) : null}
        {returnValue > 0 ? '+' : ''}{returnValue.toFixed(2)}%
      </div>
    );
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
          Fund Comparison
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gradient-to-r from-gray-50 to-gray-100">
                Metric
              </th>
              {funds.map((fund) => (
                <th key={fund.meta.scheme_code} className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gradient-to-r from-gray-50 to-gray-100">
                  {fund.meta.scheme_name.length > 30 
                    ? `${fund.meta.scheme_name.substring(0, 30)}...` 
                    : fund.meta.scheme_name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 bg-gray-50/50">
                Scheme Code
              </td>
              {funds.map((fund) => (
                <td key={fund.meta.scheme_code} className="px-6 py-4 whitespace-nowrap text-sm text-center font-mono bg-indigo-50 text-indigo-800 font-semibold">
                  {fund.meta.scheme_code}
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 bg-gray-50/50">
                Latest NAV
              </td>
              {funds.map((fund) => (
                <td key={fund.meta.scheme_code} className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-green-700">
                  {formatCurrency(fund.data[0]?.nav || '0')}
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 bg-gray-50/50">
                Latest Date
              </td>
              {funds.map((fund) => (
                <td key={fund.meta.scheme_code} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                  {formatDate(fund.data[0]?.date || '')}
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 bg-gray-50/50">
                3M Return
              </td>
              {funds.map((fund) => (
                <td key={fund.meta.scheme_code} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <ReturnCell returnValue={calculateTrailingReturn(fund, 3)} />
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 bg-gray-50/50">
                6M Return
              </td>
              {funds.map((fund) => (
                <td key={fund.meta.scheme_code} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <ReturnCell returnValue={calculateTrailingReturn(fund, 6)} />
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 bg-gray-50/50">
                Fund House
              </td>
              {funds.map((fund) => (
                <td key={fund.meta.scheme_code} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                  {fund.meta.fund_house}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 text-xs text-gray-600 border-t border-gray-200">
        <p>Returns are calculated using nearest available NAV within ±3 days of target date. Missing data shows "—".</p>
      </div>
    </div>
  );
}