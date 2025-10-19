// components/admin/StatusBadge.tsx
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

type StatusVariant =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'active'
  | 'inactive'
  | 'completed'
  | 'cancelled'
  | 'open'
  | 'closed'
  | 'investigating'
  | 'resolved'
  | 'escalated'
  | 'flagged'
  | 'suspended'
  | 'banned';

interface StatusBadgeProps {
  status: StatusVariant | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  active: 'bg-blue-100 text-green-800 dark:bg-blue-900/30 dark:text-blue-400',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
  open: 'bg-blue-100 text-green-800 dark:bg-blue-900/30 dark:text-blue-400',
  closed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
  investigating: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  escalated: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  flagged: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  suspended: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  banned: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  needs_review: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  in_progress: 'bg-blue-100 text-green-800 dark:bg-blue-900/30 dark:text-blue-400',
  waiting_response: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace(/ /g, '_');
  const style = statusStyles[normalizedStatus] || statusStyles.pending;

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        style,
        sizeStyles[size],
        className
      )}
    >
      {status}
    </span>
  );
}
