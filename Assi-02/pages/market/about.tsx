import { GetStaticProps } from 'next';
import AppLinkCard from '@/components/AppLinkCard';
import { Info, Router, Layers, Clock, Zap, Database, Globe } from 'lucide-react';

interface AboutPageProps {
  buildTime: string;
}

// SSG via getStaticProps (no fetch)
export default function MarketAboutPage({ buildTime }: AboutPageProps) {
  const routingInfo = [
    {
      router: 'App Router',
      path: '/learn/*',
      icon: Router,
      description: 'Modern Next.js 13+ routing with Server Components and advanced features',
      routes: [
        { path: '/learn', method: 'SSG', description: 'Static overview page' },
        { path: '/learn/funds', method: 'ISR', description: 'Curated funds list (24h revalidation)' },
        { path: '/learn/fund/[code]', method: 'SSR', description: 'Dynamic fund details' },
        { path: '/learn/tools', method: 'CSR', description: 'Interactive fund search' }
      ]
    },
    {
      router: 'Pages Router',
      path: '/market/*',
      icon: Layers,
      description: 'Traditional Next.js routing with getStaticProps and getServerSideProps',
      routes: [
        { path: '/market', method: 'ISR', description: 'Market snapshot (1h revalidation)' },
        { path: '/market/fund/[code]', method: 'SSR', description: 'Fund performance analysis' },
        { path: '/market/compare', method: 'CSR', description: 'Interactive fund comparison' },
        { path: '/market/about', method: 'SSG', description: 'Static documentation page' }
      ]
    }
  ];

  const renderingMethods = [
    {
      method: 'SSG',
      icon: Globe,
      color: 'green',
      title: 'Static Site Generation',
      description: 'Pages generated at build time for maximum performance',
      useCases: ['Landing pages', 'Documentation', 'Marketing content'],
      routes: ['/learn', '/market/about']
    },
    {
      method: 'ISR',
      icon: Clock,
      color: 'blue',
      title: 'Incremental Static Regeneration',
      description: 'Static pages that update on-demand with fresh data',
      useCases: ['Product listings', 'Content that changes periodically'],
      routes: ['/learn/funds (24h)', '/market (1h)']
    },
    {
      method: 'SSR',
      icon: Database,
      color: 'purple',
      title: 'Server-Side Rendering',
      description: 'Pages rendered on each request with fresh data',
      useCases: ['User-specific content', 'Real-time data', 'Dynamic pages'],
      routes: ['/learn/fund/[code]', '/market/fund/[code]']
    },
    {
      method: 'CSR',
      icon: Zap,
      color: 'orange',
      title: 'Client-Side Rendering',
      description: 'Interactive pages with client-side data fetching',
      useCases: ['Interactive tools', 'Real-time updates', 'User interactions'],
      routes: ['/learn/tools', '/market/compare']
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-50 border-green-200 text-green-800',
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium mb-4">
          <Info className="h-4 w-4 mr-2" />
          Documentation
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Dual Router Architecture
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          This application demonstrates both Next.js App Router and Pages Router 
          working together, showcasing all major rendering patterns (SSG, ISR, SSR, CSR).
        </p>
      </div>

      {/* SSG Mode Indicator */}
      <div className="mb-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">SSG Mode (Pages Router):</span> This documentation 
                  page is statically generated at build time for optimal performance.
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Built: {new Date(buildTime).toLocaleString('en-US', {
                dateStyle: 'short',
                timeStyle: 'medium'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Router Comparison */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Router Architecture Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {routingInfo.map((router) => {
            const Icon = router.icon;
            return (
              <div key={router.router} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{router.router}</h3>
                      <p className="text-sm text-blue-700 font-mono">{router.path}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{router.description}</p>
                </div>
                
                <div className="p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Routes & Methods:</h4>
                  <div className="space-y-3">
                    {router.routes.map((route) => (
                      <div key={route.path} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-mono text-sm text-gray-900">{route.path}</div>
                          <div className="text-xs text-gray-600">{route.description}</div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          route.method === 'SSG' ? 'bg-green-100 text-green-800' :
                          route.method === 'ISR' ? 'bg-blue-100 text-blue-800' :
                          route.method === 'SSR' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {route.method}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rendering Methods */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Rendering Methods Explained
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderingMethods.map((method) => {
            const Icon = method.icon;
            const colorClasses = getColorClasses(method.color);
            
            return (
              <div key={method.method} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className={`px-6 py-4 border-b border-gray-200 ${colorClasses}`}>
                  <div className="flex items-center">
                    <Icon className="h-6 w-6 mr-3" />
                    <div>
                      <h3 className="font-semibold text-lg">{method.method}</h3>
                      <h4 className="text-sm opacity-90">{method.title}</h4>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 text-sm mb-2">Best for:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {method.useCases.map((useCase) => (
                        <li key={useCase} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 text-sm mb-2">Used in:</h5>
                    <div className="flex flex-wrap gap-1">
                      {method.routes.map((route) => (
                        <span key={route} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-mono">
                          {route}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Source & Limitations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Data Source & Limitations
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">MF API Integration</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></div>
                <span><strong>Base URL:</strong> https://api.mfapi.in/mf</span>
              </div>
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></div>
                <span><strong>Endpoints:</strong> Scheme list, individual fund details</span>
              </div>
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></div>
                <span><strong>Update Frequency:</strong> Business days, with possible delays</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Known Limitations</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2"></div>
                <span>NAV updates may be delayed during market holidays</span>
              </div>
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2"></div>
                <span>Some historical data points may be missing</span>
              </div>
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2"></div>
                <span>Return calculations use nearest available dates (±3 days)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppLinkCard
          title="Explore Learning Hub"
          description="Try out the App Router implementation with curated funds and search tools."
          href="/learn"
          icon={Router}
          ctaText="Visit Learn Section"
          variant="featured"
        />
        <AppLinkCard
          title="View Market Analysis"
          description="Experience Pages Router features with market snapshots and fund comparison."
          href="/market"
          icon={Layers}
          ctaText="Visit Market Section"
        />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      buildTime: new Date().toISOString()
    }
  };
};