import { GetStaticProps } from 'next';
import AppLinkCard from '@/components/AppLinkCard';

interface RouteInfo {
  path: string;
  type: string;
  description: string;
}

interface AboutPageProps {
  routes: RouteInfo[];
}

export default function AboutPage({ routes }: AboutPageProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About This App</h1>
        <p className="text-gray-600">
          This app demonstrates the coexistence of Next.js App Router and Pages Router in a single project,
          showcasing different rendering patterns and data fetching strategies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Routing Structure</h2>
        <div className="grid gap-6">
          {routes.map((route) => (
            <div key={route.path} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {route.path}
              </h3>
              <p className="text-sm text-indigo-600 mb-2">
                {route.type}
              </p>
              <p className="text-gray-600">
                {route.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Source</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">MFAPI.in</h3>
          <p className="text-gray-600 mb-4">
            All mutual fund data is sourced from MFAPI.in. Please note the following limitations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>NAV updates may have delays due to market holidays</li>
            <li>Some funds may have missing historical NAV data</li>
            <li>API response times may vary based on server load</li>
            <li>Data accuracy is subject to source reliability</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const routes: RouteInfo[] = [
    {
      path: '/learn',
      type: 'Static Site Generation (SSG)',
      description: 'Static overview page with navigation links to all sections.'
    },
    {
      path: '/learn/funds',
      type: 'Incremental Static Regeneration (ISR)',
      description: 'Curated list of funds with daily revalidation.'
    },
    {
      path: '/learn/fund/[code]',
      type: 'Server-Side Rendering (SSR)',
      description: 'Dynamic fund details with server-side rendering for fresh data.'
    },
    {
      path: '/learn/tools',
      type: 'Client-Side Rendering (CSR)',
      description: 'Interactive fund search with client-side API calls.'
    },
    {
      path: '/market',
      type: 'Incremental Static Regeneration (ISR)',
      description: 'Market snapshot with hourly updates via Pages Router.'
    },
    {
      path: '/market/fund/[code]',
      type: 'Server-Side Rendering (SSR)',
      description: 'Dynamic fund details using getServerSideProps.'
    },
    {
      path: '/market/compare',
      type: 'Client-Side Rendering (CSR)',
      description: 'Interactive fund comparison tool with client-side state.'
    },
    {
      path: '/market/about',
      type: 'Static Site Generation (SSG)',
      description: 'Static documentation page about the app architecture.'
    }
  ];

  return {
    props: {
      routes
    }
  };
};
