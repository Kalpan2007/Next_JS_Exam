import React from 'react';
import Link from 'next/link';

interface FundSummaryCardProps {
  schemeCode: string;
  schemeName: string;
  latestNAV: string;
  latestDate: string;
  monthReturn?: number | null;
  useAppRouter?: boolean;
}

const FundSummaryCard: React.FC<FundSummaryCardProps> = ({
  schemeCode,
  schemeName,
  latestNAV,
  latestDate,
  monthReturn,
  useAppRouter = false
}) => {
  const href = useAppRouter 
    ? `/learn/fund/${schemeCode}`
    : `/market/fund/${schemeCode}`;

  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-indigo-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2 min-h-[3.5rem]">
          {schemeName}
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Latest NAV</p>
            <p className="text-lg font-semibold text-gray-900">₹{latestNAV}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">As of</p>
            <p className="text-base text-gray-900">{new Date(latestDate).toLocaleDateString()}</p>
          </div>
        </div>
        {monthReturn !== undefined && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">1 Month Return</p>
            <p className={`text-lg font-semibold ${monthReturn && monthReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {monthReturn ? `${monthReturn.toFixed(2)}%` : '—'}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default FundSummaryCard;
