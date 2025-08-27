import { fetchSchemeDetails } from "../../../lib/mfapi";
import FundList from "../../../components/FundList";

const codes = ["122639","120492","125497","118825","125354","118955","120166","120586","118778","130503"];

export const revalidate = 86400; // ISR daily

export default async function FundsPage() {
  const funds = await Promise.all(codes.map(c => fetchSchemeDetails(c)));
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Curated Funds</h1>
      <div className="text-gray-600 mb-6">Updated daily with latest NAV data</div>
      <FundList funds={funds} useAppRouter={true} />
    </div>
  );
}
