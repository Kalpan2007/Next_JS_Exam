export const dynamic = "force-static"; // SSG

import AppLinkCard from "@/components/AppLinkCard";

export default function LearnHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Learn Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AppLinkCard title="Funds" href="/learn/funds" desc="View curated funds (ISR)" />
        <AppLinkCard title="Fund Detail" href="/learn/fund/120492" desc="Dynamic SSR fund detail" />
        <AppLinkCard title="Tools" href="/learn/tools" desc="Search a scheme (CSR)" />
        <AppLinkCard title="Market" href="/market" desc="Switch to Pages Router" />
      </div>
    </div>
  );
}
