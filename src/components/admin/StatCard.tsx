// components/admin/StatCard.tsx
"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
  iconClassName?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  className,
  iconClassName,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6",
        "hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
            {value}
          </h3>

          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                )}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                vs last period
              </span>
            </div>
          )}

          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {description}
            </p>
          )}
        </div>

        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-lg",
            "bg-gray-100 dark:bg-gray-800",
            iconClassName
          )}
        >
          <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </div>
      </div>
    </div>
  );
}
