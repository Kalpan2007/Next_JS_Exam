import React from 'react';
import { MFScheme } from '../lib/mfapi';
import { getLatestNAV, calculateTrailingReturns } from '../lib/returns';

interface CompareTableProps {
  funds: MFScheme[];
}

const CompareTable: React.FC<CompareTableProps> = ({ funds }) => {
  const fundData = funds.map(fund => {
    const { nav, date } = getLatestNAV(fund.data);
    const returns = calculateTrailingReturns(fund.data);
    return {
      name: fund.scheme_name,
      code: fund.scheme_code,
      latestNAV: nav,
      latestDate: date,
      returns
    };
  });

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Metric
            </th>
            {fundData.map((fund) => (
              <th
                key={fund.code}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {fund.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Latest NAV
            </td>
            {fundData.map((fund) => (
              <td key={fund.code} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ₹{fund.latestNAV}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Latest Date
            </td>
            {fundData.map((fund) => (
              <td key={fund.code} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(fund.latestDate).toLocaleDateString()}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              3M Return
            </td>
            {fundData.map((fund) => (
              <td key={fund.code} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {fund.returns.threeMonth 
                  ? `${fund.returns.threeMonth.toFixed(2)}%`
                  : '—'}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              6M Return
            </td>
            {fundData.map((fund) => (
              <td key={fund.code} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {fund.returns.sixMonth
                  ? `${fund.returns.sixMonth.toFixed(2)}%`
                  : '—'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
