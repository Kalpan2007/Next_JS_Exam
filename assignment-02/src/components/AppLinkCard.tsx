import React from 'react';
import Link from 'next/link';

interface AppLinkCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

const AppLinkCard: React.FC<AppLinkCardProps> = ({
  title,
  description,
  href,
  icon
}) => {
  return (
    <Link
      href={href}
      className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition-colors duration-200"
    >
      <div className="flex items-center space-x-4">
        {icon && (
          <div className="flex-shrink-0 text-indigo-500">
            {icon}
          </div>
        )}
        <div>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AppLinkCard;
