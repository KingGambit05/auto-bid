// components/admin/AdminHeader.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Bell, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminHeaderProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  className?: string;
}

export function AdminHeader({
  title,
  breadcrumbs,
  actions,
  className,
}: AdminHeaderProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if not provided
  const generatedBreadcrumbs = React.useMemo(() => {
    if (breadcrumbs) return breadcrumbs;

    const paths = pathname.split('/').filter(Boolean);
    const crumbs: { label: string; href?: string }[] = [];

    paths.forEach((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const label = path
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      crumbs.push({
        label,
        href: index < paths.length - 1 ? href : undefined,
      });
    });

    return crumbs;
  }, [pathname, breadcrumbs]);

  // Get page title from last breadcrumb if not provided
  const pageTitle =
    title || generatedBreadcrumbs[generatedBreadcrumbs.length - 1]?.label;

  return (
    <header
      className={cn(
        'sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800',
        className
      )}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Title and Breadcrumbs */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumbs */}
            {generatedBreadcrumbs.length > 0 && (
              <nav className="flex items-center gap-2 mb-1" aria-label="Breadcrumb">
                {generatedBreadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-900 dark:text-white font-medium">
                        {crumb.label}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}

            {/* Page Title */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
              {pageTitle}
            </h1>
          </div>

          {/* Right: Search, Notifications, Actions */}
          <div className="flex items-center gap-4 ml-6">
            {/* Search */}
            <button
              className="hidden lg:flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Notifications */}
            <button
              className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Custom Actions */}
            {actions}
          </div>
        </div>
      </div>
    </header>
  );
}

// Quick Stats Header (for dashboards)
interface QuickStatsHeaderProps {
  stats: {
    label: string;
    value: string | number;
    trend?: {
      value: number;
      isPositive: boolean;
    };
  }[];
  className?: string;
}

export function QuickStatsHeader({ stats, className }: QuickStatsHeaderProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4',
        className
      )}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              {stat.trend && (
                <span
                  className={cn(
                    'text-sm font-medium',
                    stat.trend.isPositive
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  )}
                >
                  {stat.trend.isPositive ? '+' : ''}
                  {stat.trend.value}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
