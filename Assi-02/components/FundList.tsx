import FundSummaryCard from './FundSummaryCard';
import { MutualFundData } from '@/lib/api';

interface FundListProps {
  funds: (MutualFundData | null)[];
  baseLinkPath: string;
  showReturns?: boolean;
}

export default function FundList({ funds, baseLinkPath, showReturns = false }: FundListProps) {
  const validFunds = funds.filter(fund => fund !== null) as MutualFundData[];

  if (validFunds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No fund data available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {validFunds.map((fund) => {
        const latestNAV = fund.data[0];
        let returnPercentage: number | undefined;

        if (showReturns && fund.data.length > 30) {
          const pastNAV = fund.data[29]; // Approximate 1-month return
          if (pastNAV) {
            const currentVal = parseFloat(latestNAV.nav);
            const pastVal = parseFloat(pastNAV.nav);
            returnPercentage = ((currentVal - pastVal) / pastVal) * 100;
          }
        }

        return (
          <FundSummaryCard
            key={fund.meta.scheme_code}
            schemeCode={fund.meta.scheme_code}
            schemeName={fund.meta.scheme_name}
            latestNAV={latestNAV.nav}
            latestDate={latestNAV.date}
            linkPath={`${baseLinkPath}/${fund.meta.scheme_code}`}
            returnPercentage={returnPercentage}
            fundHouse={fund.meta.fund_house}
          />
        );
      })}
    </div>
  );
}