'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, BookOpen, BarChart3, Search, GitCompare, Info, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Learn', href: '/learn', icon: BookOpen, section: 'learn' },
  { name: 'Funds', href: '/learn/funds', icon: TrendingUp, section: 'learn' },
  { name: 'Tools', href: '/learn/tools', icon: Search, section: 'learn' },
  { name: 'Market', href: '/market', icon: BarChart3, section: 'market' },
  { name: 'Compare', href: '/market/compare', icon: GitCompare, section: 'market' },
  { name: 'About', href: '/market/about', icon: Info, section: 'market' },
];

export default function NavBar() {
  const pathname = usePathname() ?? '';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">
             Assignment-02
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = 
                (item.section === 'learn' && pathname.startsWith('/learn') && item.href === '/learn') ||
                (item.section === 'market' && pathname.startsWith('/market') && item.href === '/market') ||
                (pathname.startsWith(item.href) && item.href !== '/' && item.href !== '/learn' && item.href !== '/market');
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = 
                (item.section === 'learn' && pathname.startsWith('/learn') && item.href === '/learn') ||
                (item.section === 'market' && pathname.startsWith('/market') && item.href === '/market') ||
                (pathname.startsWith(item.href) && item.href !== '/' && item.href !== '/learn' && item.href !== '/market');
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}