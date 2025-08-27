import { fetchScheme } from "../../../../lib/mfapi";
import FundDetail from "../../../../components/FundDetail";

export const dynamic = "force-dynamic"; // SSR

export default async function FundPage({ params }: { params: { code: string } }) {
  try {
    const scheme = await fetchScheme(params.code);
    return <FundDetail scheme={scheme} />;
  } catch {
    return <div className="text-red-400">Invalid code or no data.</div>;
  }
}
