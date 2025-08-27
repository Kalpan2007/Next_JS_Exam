import AppLinkCard from '@/components/AppLinkCard';
import { BookOpen, TrendingUp, Search, BarChart3, GitCompare, Info, Layers, Router } from 'lucide-react';

// SSG - Static Site Generation
export default function LearnPage() {
  const learnLinks = [
    {
      title: 'Fund Explorer',
      description: 'Browse curated mutual funds with latest NAV data and performance metrics. Updated daily with comprehensive fund information.',
      href: '/learn/funds',
      icon: TrendingUp,
      ctaText: 'Explore Funds'
    },
    {
      title: 'Search Tools',
      description: 'Search for specific mutual funds by scheme code. Get instant access to fund details and recent performance data.',
      href: '/learn/tools',
      icon: Search,
      ctaText: 'Search Funds'
    },
    {
      title: 'Market Snapshot',
      description: 'View real-time market overview with top performing funds and quick performance indicators updated hourly.',
      href: '/market',
      icon: BarChart3,
      ctaText: 'View Market'
    },
    {
      title: 'Fund Comparison',
      description: 'Compare up to 3 mutual funds side by side with detailed performance metrics and return analysis.',
      href: '/market/compare',
      icon: GitCompare,
      ctaText: 'Compare Funds'
    }
  ];

  const architectureInfo = [
    {
      title: 'App Router (/learn/*)',
      description: 'Modern Next.js 13+ routing with advanced features like ISR, SSR, and streaming. Handles the learning and exploration features.',
      icon: Router,
      features: ['Server Components', 'Streaming', 'ISR & SSR', 'Modern Architecture']
    },
    {
      title: 'Pages Router (/market/*)',
      description: 'Traditional Next.js routing system with getStaticProps and getServerSideProps. Powers the market analysis features.',
      icon: Layers,
      features: ['getStaticProps', 'getServerSideProps', 'API Routes', 'Traditional Routing']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
          <BookOpen className="h-4 w-4 mr-2" />
          Learning Hub
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Mutual Fund Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive mutual fund analytics platform showcasing dual routing architecture with 
          Next.js App Router and Pages Router working seamlessly together.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
        {learnLinks.map((link) => (
          <AppLinkCard
            key={link.href}
            {...link}
            variant={link.href === '/learn/funds' ? 'featured' : 'default'}
          />
        ))}
      </div>

      {/* Architecture Overview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Dual Router Architecture
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {architectureInfo.map((info) => {
            const Icon = info.icon;
            return (
              <div key={info.title} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{info.description}</p>
                <div className="flex flex-wrap gap-2">
                  {info.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rendering Methods */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendering Methods Demonstrated</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-green-800 font-semibold text-sm mb-1">SSG</div>
            <div className="text-xs text-green-600">Static Site Generation</div>
            <div className="text-xs text-gray-600 mt-2">/learn, /market/about</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-blue-800 font-semibold text-sm mb-1">ISR</div>
            <div className="text-xs text-blue-600">Incremental Static Regeneration</div>
            <div className="text-xs text-gray-600 mt-2">/learn/funds, /market</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-purple-800 font-semibold text-sm mb-1">SSR</div>
            <div className="text-xs text-purple-600">Server-Side Rendering</div>
            <div className="text-xs text-gray-600 mt-2">/learn/fund/[code], /market/fund/[code]</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-orange-800 font-semibold text-sm mb-1">CSR</div>
            <div className="text-xs text-orange-600">Client-Side Rendering</div>
            <div className="text-xs text-gray-600 mt-2">/learn/tools, /market/compare</div>
          </div>
        </div>
      </div>
    </div>
  );
}