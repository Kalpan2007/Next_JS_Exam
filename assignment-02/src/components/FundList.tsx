import React from 'react';
import FundSummaryCard from './FundSummaryCard';
import { MFScheme } from '../lib/mfapi';
import { getLatestNAV, calculateTrailingReturns } from '../lib/returns';

interface FundListProps {
  funds: MFScheme[];
  useAppRouter?: boolean;
}

const FundList: React.FC<FundListProps> = ({ funds, useAppRouter = false }) => {
  if (!funds.length) {
    return (
      <div className="text-center text-gray-500 p-8">
        No funds available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {funds.map((fund) => {
        const { nav, date } = getLatestNAV(fund.data);
        const returns = calculateTrailingReturns(fund.data);
        
        return (
          <FundSummaryCard
            key={fund.scheme_code}
            schemeCode={fund.scheme_code}
            schemeName={fund.scheme_name}
            latestNAV={nav}
            latestDate={date}
            monthReturn={returns.oneMonth}
            useAppRouter={useAppRouter}
          />
        );
      })}
    </div>
  );
};

export default FundList;
