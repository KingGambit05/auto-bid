// components/admin/AdminSidebar.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Shield,
  FileCheck,
  MessageSquare,
  Flag,
  Handshake,
  Truck,
  Package,
  Scale,
  DollarSign,
  Receipt,
  FileText,
  BarChart3,
  Settings,
  AlertTriangle,
  Activity,
  Zap,
  Lock,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  adminOnly?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
  adminOnly?: boolean;
}

const moderatorNavigation: NavSection[] = [
  {
    title: 'Overview',
    items: [
      {
        label: 'Dashboard',
        href: '/moderator/dashboard',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'KYC & Verification',
    items: [
      {
        label: 'KYC Review Queue',
        href: '/moderator/kyc/queue',
        icon: FileCheck,
        badge: 12,
      },
    ],
  },
  {
    title: 'Support & Moderation',
    items: [
      {
        label: 'Support Tickets',
        href: '/moderator/tickets',
        icon: MessageSquare,
        badge: 5,
      },
      {
        label: 'Content Moderation',
        href: '/moderator/moderation',
        icon: Flag,
        badge: 3,
      },
    ],
  },
  {
    title: 'Transactions',
    items: [
      {
        label: 'Transaction Review',
        href: '/moderator/transactions',
        icon: Handshake,
      },
      {
        label: 'Shipping Evidence',
        href: '/moderator/shipping-evidence',
        icon: Truck,
        badge: 7,
      },
      {
        label: 'Delivery Evidence',
        href: '/moderator/delivery-evidence',
        icon: Package,
      },
      {
        label: 'Escalations',
        href: '/moderator/escalations',
        icon: AlertTriangle,
      },
    ],
  },
];

const adminNavigation: NavSection[] = [
  {
    title: 'Overview',
    items: [
      {
        label: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'User Management',
    items: [
      {
        label: 'Users',
        href: '/admin/users',
        icon: Users,
        adminOnly: true,
      },
      {
        label: 'Trust Scores',
        href: '/admin/trust-scores',
        icon: Shield,
        adminOnly: true,
      },
      {
        label: 'Fraud Review',
        href: '/admin/fraud',
        icon: AlertTriangle,
        badge: 2,
        adminOnly: true,
      },
    ],
  },
  {
    title: 'KYC & Verification',
    items: [
      {
        label: 'KYC Analytics',
        href: '/admin/kyc/analytics',
        icon: BarChart3,
        adminOnly: true,
      },
      {
        label: 'KYC Review Queue',
        href: '/admin/kyc/queue',
        icon: FileCheck,
        badge: 12,
      },
    ],
  },
  {
    title: 'Listings & Auctions',
    items: [
      {
        label: 'Listing Management',
        href: '/admin/listings',
        icon: FileText,
        adminOnly: true,
      },
      {
        label: 'Active Monitor',
        href: '/admin/listings/active',
        icon: Activity,
        adminOnly: true,
      },
    ],
  },
  {
    title: 'Transactions & Payments',
    items: [
      {
        label: 'Transaction Review',
        href: '/admin/transactions',
        icon: Handshake,
      },
      {
        label: 'Escrow Management',
        href: '/admin/escrow',
        icon: DollarSign,
        adminOnly: true,
      },
      {
        label: 'Payment Logs',
        href: '/admin/payments',
        icon: Receipt,
        adminOnly: true,
      },
      {
        label: 'Shipping Evidence',
        href: '/admin/shipping-evidence',
        icon: Truck,
        badge: 7,
      },
      {
        label: 'Delivery Evidence',
        href: '/admin/delivery-evidence',
        icon: Package,
      },
    ],
  },
  {
    title: 'Disputes',
    items: [
      {
        label: 'Dispute Dashboard',
        href: '/admin/disputes',
        icon: Scale,
        badge: 8,
        adminOnly: true,
      },
      {
        label: 'Senior Panel',
        href: '/admin/disputes/senior',
        icon: Shield,
        badge: 2,
        adminOnly: true,
      },
    ],
  },
  {
    title: 'Support & Moderation',
    items: [
      {
        label: 'Support Tickets',
        href: '/admin/tickets',
        icon: MessageSquare,
        badge: 5,
      },
      {
        label: 'Content Moderation',
        href: '/admin/moderation',
        icon: Flag,
        badge: 3,
      },
    ],
  },
  {
    title: 'Analytics & Reports',
    items: [
      {
        label: 'Reports Dashboard',
        href: '/admin/reports',
        icon: BarChart3,
        adminOnly: true,
      },
      {
        label: 'Analytics Builder',
        href: '/admin/analytics',
        icon: FileText,
        adminOnly: true,
      },
      {
        label: 'Audit Logs',
        href: '/admin/audit-logs',
        icon: FileCheck,
        adminOnly: true,
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        label: 'Alerts',
        href: '/admin/alerts',
        icon: AlertTriangle,
        adminOnly: true,
      },
      {
        label: 'System Health',
        href: '/admin/system-health',
        icon: Activity,
        adminOnly: true,
      },
      {
        label: 'Emergency Controls',
        href: '/admin/emergency',
        icon: Zap,
        adminOnly: true,
      },
      {
        label: 'Feature Flags',
        href: '/admin/feature-flags',
        icon: Lock,
        adminOnly: true,
      },
      {
        label: 'Settings',
        href: '/admin/settings',
        icon: Settings,
        adminOnly: true,
      },
    ],
  },
];

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === 'admin';
  const navigation = isAdmin ? adminNavigation : moderatorNavigation;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-40 h-screen transition-all duration-300',
        'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-800">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                AutoBID
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isAdmin ? 'Admin Portal' : 'Moderator Portal'}
              </p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navigation.map((section) => {
            // Filter out admin-only sections for moderators
            if (!isAdmin && section.adminOnly) return null;

            // Filter out admin-only items for moderators
            const visibleItems = section.items.filter(
              (item) => isAdmin || !item.adminOnly
            );

            if (visibleItems.length === 0) return null;

            return (
              <div key={section.title}>
                {!isCollapsed && (
                  <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {visibleItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                            'hover:bg-gray-100 dark:hover:bg-gray-800',
                            isActive
                              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                              : 'text-gray-700 dark:text-gray-300',
                            isCollapsed && 'justify-center'
                          )}
                          title={isCollapsed ? item.label : undefined}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1">{item.label}</span>
                              {item.badge && (
                                <span
                                  className={cn(
                                    'px-2 py-0.5 text-xs font-medium rounded-full',
                                    isActive
                                      ? 'bg-white/20 text-white dark:bg-gray-900/20 dark:text-gray-900'
                                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                                  )}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 mx-auto" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
