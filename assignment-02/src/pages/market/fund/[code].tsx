import { GetServerSideProps } from 'next';
import { fetchSchemeDetails, MFScheme } from '@/lib/mfapi';
import FundDetail from '@/components/FundDetail';
import EmptyState from '@/components/EmptyState';

interface FundPageProps {
  fund?: MFScheme;
  error?: string;
}

export default function FundPage({ fund, error }: FundPageProps) {
  if (error || !fund) {
    return (
      <EmptyState
        message={error || 'Fund not found'}
        suggestion="Please check the fund code and try again"
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <FundDetail fund={fund} showReturns={true} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<FundPageProps> = async ({ params }) => {
  try {
    const code = params?.code as string;
    const fund = await fetchSchemeDetails(code);

    return {
      props: {
        fund,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to load fund details',
      },
    };
  }
};
