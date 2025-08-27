import { GetStaticProps } from "next";
import { fetchSchemeDetails, MFScheme } from "@/lib/mfapi";
import FundList from "@/components/FundList";

// Fixed list of scheme codes for market snapshot
const MARKET_SCHEMES = ["122639", "120492", "125497", "118825", "125354"];

interface MarketPageProps {
  funds: MFScheme[];
}

export const getStaticProps: GetStaticProps<MarketPageProps> = async () => {
  try {
    const funds = await Promise.all(MARKET_SCHEMES.map(code => fetchSchemeDetails(code)));
    
    return {
      props: {
        funds,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Failed to fetch market data:', error);
    return {
      props: {
        funds: [],
      },
      revalidate: 3600,
    };
  }
};

export default function MarketHome({ funds }: MarketPageProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 border border-gray-100">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Market Snapshot</h1>
          <p className="text-gray-600">
            Latest updates from selected mutual funds, refreshed hourly
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 border border-gray-100">
        <FundList funds={funds} useAppRouter={false} />
      </div>
    </div>
  );
}
