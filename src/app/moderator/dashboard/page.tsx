// app/(moderator)/dashboard/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import {
  FileCheck,
  MessageSquare,
  Flag,
  Truck,
  CheckCircle,
  Clock,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { StatCard } from '@/components/admin';
import { mockModeratorDashboardStats } from '@/lib/mockData/adminData';
import { timeAgo, formatNumber } from '@/lib/utils';

export default function ModeratorDashboardPage() {
  const stats = mockModeratorDashboardStats;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Moderator Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what needs your attention today.
        </p>
      </div>

      {/* Pending Tasks - Priority Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Pending Tasks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/moderator/kyc/queue">
            <StatCard
              title="KYC Applications"
              value={stats.pendingTasks.kyc}
              icon={FileCheck}
              iconClassName="bg-blue-100 dark:bg-blue-900/30"
              description="Awaiting review"
              className="cursor-pointer hover:shadow-lg transition-all"
            />
          </Link>

          <Link href="/moderator/tickets">
            <StatCard
              title="Support Tickets"
              value={stats.pendingTasks.tickets}
              icon={MessageSquare}
              iconClassName="bg-green-100 dark:bg-green-900/30"
              description="Open tickets"
              className="cursor-pointer hover:shadow-lg transition-all"
            />
          </Link>

          <Link href="/moderator/moderation">
            <StatCard
              title="Content Reports"
              value={stats.pendingTasks.reports}
              icon={Flag}
              iconClassName="bg-red-100 dark:bg-red-900/30"
              description="Flagged content"
              className="cursor-pointer hover:shadow-lg transition-all"
            />
          </Link>

          <Link href="/moderator/shipping-evidence">
            <StatCard
              title="Evidence Review"
              value={stats.pendingTasks.evidence}
              icon={Truck}
              iconClassName="bg-yellow-100 dark:bg-yellow-900/30"
              description="Pending verification"
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                View All
              </button>
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
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>

            <div className="space-y-3">
              <Link
                href="/moderator/kyc/queue"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-green-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Review KYC
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </Link>

              <Link
                href="/moderator/tickets"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Support Tickets
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </Link>

              <Link
                href="/moderator/moderation"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Flag className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Content Moderation
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </Link>

              <Link
                href="/moderator/shipping-evidence"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Evidence Review
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </Link>

              <Link
                href="/moderator/escalations"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Escalate Case
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </Link>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="mt-6 bg-gradient-to-br from-green-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium opacity-90">
                  Tasks Completed Today
                </p>
                <p className="text-3xl font-bold mt-1">
                  {stats.todayStats.reviewedKYC +
                    stats.todayStats.resolvedTickets +
                    stats.todayStats.moderatedContent}
                </p>
              </div>
              <Clock className="w-8 h-8 opacity-80" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Great work! Keep it up</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
