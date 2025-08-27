import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface AppLinkCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  ctaText?: string;
  variant?: 'default' | 'featured';
}

export default function AppLinkCard({ 
  title, 
  description, 
  href, 
  icon: Icon, 
  ctaText = 'Explore',
  variant = 'default'
}: AppLinkCardProps) {
  return (
    <Link href={href} className="block group">
      <div className={`
        rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border bg-white
        ${variant === 'featured' 
          ? 'border-blue-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }
      `}>
        <div className="flex items-start justify-between mb-4">
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center
            ${variant === 'featured' 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
              : 'bg-gray-100 group-hover:bg-gray-200'
            }
          `}>
            <Icon className={`h-6 w-6 ${variant === 'featured' ? 'text-white' : 'text-gray-600'}`} />
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
        
        <div className="flex items-center text-sm font-medium">
          <span className={variant === 'featured' ? 'text-blue-700' : 'text-gray-700'}>
            {ctaText}
          </span>
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}