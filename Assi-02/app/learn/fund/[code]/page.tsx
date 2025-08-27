import { fetchMutualFund } from '@/lib/api';
import FundDetail from '@/components/FundDetail';
import EmptyState from '@/components/EmptyState';
import { notFound } from 'next/navigation';

// SSR - Server-Side Rendering (dynamic)
interface PageProps {
  params: { code: string };
}

export default async function LearnFundDetailPage({ params }: PageProps) {
  const { code } = params;

  // Validate scheme code format
  if (!/^\d+$/.test(code)) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState 
          type="error"
          title="Invalid Scheme Code"
          description="Please enter a valid numeric scheme code."
          suggestion="Scheme codes should contain only numbers (e.g., 122639)."
        />
      </div>
    );
  }

  const fund = await fetchMutualFund(code);

  if (!fund) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState 
          type="search"
          title="Fund Not Found"
          description={`No mutual fund found for scheme code: ${code}`}
          suggestion="Please verify the scheme code and try again. Some funds may be inactive or delisted."
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-purple-800">
                <span className="font-semibold">SSR Mode:</span> This page renders on every request, 
                ensuring you always see the most up-to-date fund information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FundDetail 
        fund={fund} 
        showRecentNAVs={true}
        maxEntries={30}
      />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const fund = await fetchMutualFund(params.code);
  
  if (!fund) {
    return {
      title: `Fund ${params.code} - Not Found`,
      description: `Mutual fund with scheme code ${params.code} was not found.`
    };
  }

  return {
    title: `${fund.meta.scheme_name} - Fund Details`,
    description: `Latest NAV: ₹${fund.data[0]?.nav}. View detailed information for ${fund.meta.scheme_name} including recent performance and NAV history.`
  };
}