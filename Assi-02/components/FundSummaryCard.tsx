import Link from 'next/link';
import { TrendingUp, TrendingDown, Calendar, ExternalLink } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/api';

interface FundSummaryCardProps {
  schemeCode: number;
  schemeName: string;
  latestNAV: string;
  latestDate: string;
  linkPath: string;
  returnPercentage?: number;
  fundHouse?: string;
}

export default function FundSummaryCard({
  schemeCode,
  schemeName,
  latestNAV,
  latestDate,
  linkPath,
  returnPercentage,
  fundHouse
}: FundSummaryCardProps) {
  const isPositiveReturn = returnPercentage && returnPercentage > 0;
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm sm:text-base leading-tight mb-1">
              {schemeName}
            </h3>
            {fundHouse && (
              <p className="text-xs text-gray-500 mb-2">{fundHouse}</p>
            )}
          </div>
          <div className="ml-3 text-right">
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(latestNAV)}
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(latestDate)}
            </div>
          </div>
        </div>

        {returnPercentage !== undefined && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">1M Return</span>
            <div className={`flex items-center text-sm font-medium ${
              isPositiveReturn ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositiveReturn ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {returnPercentage > 0 ? '+' : ''}{returnPercentage.toFixed(2)}%
            </div>
          </div>
        )}

        <Link 
          href={linkPath}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:underline"
        >
          View Details
          <ExternalLink className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 rounded-b-xl">
        <div className="text-xs text-gray-500">
          Code: <span className="font-mono">{schemeCode}</span>
        </div>
      </div>
    </div>
  );
}