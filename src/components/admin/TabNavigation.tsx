// components/admin/TabNavigation.tsx
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

export function TabNavigation({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  className,
}: TabNavigationProps) {
  const renderTab = (tab: Tab) => {
    const isActive = activeTab === tab.id;

    const baseClasses = 'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors';

    const variantClasses = {
      default: cn(
        'border-b-2',
        isActive
          ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
      ),
      pills: cn(
        'rounded-lg',
        isActive
          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      ),
      underline: cn(
        'border-b-2',
        isActive
          ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
      ),
    };

    return (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={cn(baseClasses, variantClasses[variant])}
      >
        {tab.icon}
        <span>{tab.label}</span>
        {tab.count !== undefined && (
          <span
            className={cn(
              'px-2 py-0.5 text-xs font-medium rounded-full',
              isActive
                ? variant === 'pills'
                  ? 'bg-white/20 text-white dark:bg-gray-900/20 dark:text-gray-900'
                  : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            )}
          >
            {tab.count}
          </span>
        )}
      </button>
    );
  };

  return (
    <div
      className={cn(
        'flex items-center',
        variant === 'default' || variant === 'underline'
          ? 'border-b border-gray-200 dark:border-gray-800'
          : 'gap-2',
        className
      )}
    >
      {tabs.map(renderTab)}
    </div>
  );
}
