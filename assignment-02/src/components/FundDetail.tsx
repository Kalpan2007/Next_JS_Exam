import React from 'react';
import { MFScheme } from '../lib/mfapi';
import { getLatestNAV, calculateTrailingReturns, sortNAVsByDate } from '../lib/returns';

interface FundDetailProps {
  fund: MFScheme;
  showReturns?: boolean;
}

const FundDetail: React.FC<FundDetailProps> = ({ fund, showReturns = true }) => {
  const { nav: latestNAV, date: latestDate } = getLatestNAV(fund.data);
  const returns = calculateTrailingReturns(fund.data);
  const last30Entries = sortNAVsByDate(fund.data).slice(0, 30);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{fund.scheme_name}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Latest NAV</p>
            <p className="text-xl font-semibold">₹{latestNAV}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">As of</p>
            <p className="text-xl">{new Date(latestDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {showReturns && (
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">1 Month Return</p>
            <p className={`text-lg font-semibold ${returns.oneMonth && returns.oneMonth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {returns.oneMonth ? `${returns.oneMonth.toFixed(2)}%` : '—'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">3 Month Return</p>
            <p className={`text-lg font-semibold ${returns.threeMonth && returns.threeMonth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {returns.threeMonth ? `${returns.threeMonth.toFixed(2)}%` : '—'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">6 Month Return</p>
            <p className={`text-lg font-semibold ${returns.sixMonth && returns.sixMonth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {returns.sixMonth ? `${returns.sixMonth.toFixed(2)}%` : '—'}
            </p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-4">Last 30 NAV Entries</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAV</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {last30Entries.map((entry, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{entry.nav}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FundDetail;
