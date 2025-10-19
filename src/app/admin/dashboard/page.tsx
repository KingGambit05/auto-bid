// app/(admin)/dashboard/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileCheck,
  MessageSquare,
  Flag,
  Scale,
  ArrowRight,
  AlertCircle,
  Info,
} from 'lucide-react';
import { StatCard } from '@/components/admin';
import { mockAdminDashboardStats } from '@/lib/mockData/adminData';
import { formatCurrency, formatNumber, timeAgo } from '@/lib/utils';

export default function AdminDashboardPage() {
  const stats = mockAdminDashboardStats;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Complete system overview and control center
        </p>
      </div>

      {/* System Health Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              System Uptime
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.systemHealth.uptime}%
              </p>
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Response Time
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.systemHealth.responseTime}ms
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Error Rate
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.systemHealth.errorRate}%
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Active Users
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(stats.systemHealth.activeUsers)}
              </p>
              <Activity className="w-4 h-4 text-green-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Financial Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Revenue (Today)"
            value={formatCurrency(stats.financials.revenue)}
            icon={DollarSign}
            iconClassName="bg-green-100 dark:bg-green-900/30"
            trend={{ value: 15.2, isPositive: true }}
          />

          <Link href="/admin/escrow">
            <StatCard
              title="Escrow Held"
              value={formatCurrency(stats.financials.escrowHeld)}
              icon={ShoppingCart}
              iconClassName="bg-blue-100 dark:bg-blue-900/30"
              description="In active transactions"
              className="cursor-pointer hover:shadow-lg transition-all"
            />
          </Link>

          <Link href="/admin/payments">
            <StatCard
              title="Pending Payouts"
              value={formatCurrency(stats.financials.pendingPayouts)}
              icon={Clock}
              iconClassName="bg-yellow-100 dark:bg-yellow-900/30"
              description="Ready for release"
              className="cursor-pointer hover:shadow-lg transition-all"
            />
          </Link>
        </div>
      </div>

      {/* System Alerts */}
      {(stats.alerts.critical > 0 || stats.alerts.warnings > 0) && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              System Alerts
            </h2>
            <Link
              href="/admin/alerts"
              className="text-sm text-green-600 dark:text-blue-400 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-900 dark:text-red-300">
                  Critical Alerts
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {stats.alerts.critical}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-300">
                  Warnings
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {stats.alerts.warnings}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-blue-900/20">
              <Info className="w-5 h-5 text-green-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  Info
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-blue-400">
                  {stats.alerts.info}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pending Tasks - Priority Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Pending Tasks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/kyc/queue">
            <StatCard
              title="KYC Applications"
              value={stats.pendingTasks.kyc}
              icon={FileCheck}
              iconClassName="bg-blue-100 dark:bg-blue-900/30"
              description="Awaiting review"
              className="cursor-pointer hover:shadow-lg transition-all"
            />
          </Link>

          <Link href="/admin/tickets">
            <StatCard
              title="Support Tickets"
              value={stats.pendingTasks.tickets}
              icon={MessageSquare}
              iconClassName="bg-green-100 dark:bg-green-900/30"
              description="Open tickets"
              className="cursor-pointer hover:shadow-lg transition-all"
            />
          </Link>

          <Link href="/admin/moderation">
            <StatCard
              title="Content Reports"
              value={stats.pendingTasks.reports}
              icon={Flag}
              iconClassName="bg-red-100 dark:bg-red-900/30"
              description="Flagged content"
              className="cursor-pointer hover:shadow-lg transition-all"
            />
          </Link>

          <Link href="/admin/disputes">
            <StatCard
              title="Active Disputes"
              value={8}
              icon={Scale}
              iconClassName="bg-purple-100 dark:bg-purple-900/30"
              description="Requires attention"
              className="cursor-pointer hover:shadow-lg transition-all"
            />
          </Link>
        </div>
      </div>

      {/* Today's Performance */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Today's Performance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard
            title="KYC Reviewed"
            value={stats.todayStats.reviewedKYC}
            icon={CheckCircle}
            iconClassName="bg-green-100 dark:bg-green-900/30"
            trend={{ value: 12.5, isPositive: true }}
          />

          <StatCard
            title="Tickets Resolved"
            value={stats.todayStats.resolvedTickets}
            icon={MessageSquare}
            iconClassName="bg-blue-100 dark:bg-blue-900/30"
            trend={{ value: 8.3, isPositive: true }}
          />

          <StatCard
            title="Content Moderated"
            value={stats.todayStats.moderatedContent}
            icon={Flag}
            iconClassName="bg-purple-100 dark:bg-purple-900/30"
            trend={{ value: -3.2, isPositive: false }}
          />

          <StatCard
            title="New Users"
            value={67}
            icon={Users}
            iconClassName="bg-indigo-100 dark:bg-indigo-900/30"
            trend={{ value: 22.1, isPositive: true }}
          />
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <Link
                href="/admin/audit-logs"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
                >
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.type}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {timeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>

            <div className="space-y-3">
              <Link
                href="/admin/users"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    User Management
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </Link>

              <Link
                href="/admin/disputes"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Dispute Cases
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </Link>

              <Link
                href="/admin/reports"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Reports
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    System Settings
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium opacity-90">System Status</p>
                <p className="text-3xl font-bold mt-1">All Systems Go</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-sm opacity-90">
              No critical issues detected. All services running normally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
