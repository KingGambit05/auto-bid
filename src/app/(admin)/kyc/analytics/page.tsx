// app/(admin)/kyc/analytics/page.tsx
"use client";

import React from 'react';
import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, Users } from 'lucide-react';
import { StatCard } from '@/components/admin';
import { mockKYCApplications } from '@/lib/mockData/transactionData';

export default function KYCAnalyticsPage() {
  // Calculate stats
  const total = mockKYCApplications.length;
  const approved = mockKYCApplications.filter((a) => a.status === 'approved').length;
  const rejected = mockKYCApplications.filter((a) => a.status === 'rejected').length;
  const pending = mockKYCApplications.filter((a) => a.status === 'pending').length;
  const approvalRate = total > 0 ? ((approved / total) * 100).toFixed(1) : 0;
  const avgProcessingTime = 2.5; // Mock data (hours)

  // Mock trend data
  const dailySubmissions = [
    { date: 'Mon', count: 12 },
    { date: 'Tue', count: 15 },
    { date: 'Wed', count: 18 },
    { date: 'Thu', count: 14 },
    { date: 'Fri', count: 20 },
    { date: 'Sat', count: 8 },
    { date: 'Sun', count: 5 },
  ];

  const statusDistribution = [
    { label: 'Approved', value: approved, color: 'bg-green-500' },
    { label: 'Rejected', value: rejected, color: 'bg-red-500' },
    { label: 'Pending', value: pending, color: 'bg-yellow-500' },
    { label: 'Needs Review', value: mockKYCApplications.filter((a) => a.status === 'needs_review').length, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">KYC Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Performance metrics and trends for KYC verification
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Applications"
          value={total}
          icon={Users}
          iconClassName="bg-blue-100 dark:bg-blue-900/30"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Approval Rate"
          value={`${approvalRate}%`}
          icon={CheckCircle}
          iconClassName="bg-green-100 dark:bg-green-900/30"
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="Avg. Processing Time"
          value={`${avgProcessingTime}h`}
          icon={Clock}
          iconClassName="bg-yellow-100 dark:bg-yellow-900/30"
          trend={{ value: 8.3, isPositive: false }}
          description="Target: < 2 hours"
        />
        <StatCard
          title="Pending Review"
          value={pending}
          icon={Clock}
          iconClassName="bg-orange-100 dark:bg-orange-900/30"
          description="Awaiting action"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Submissions Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Daily Submissions (Last 7 Days)
          </h2>
          <div className="space-y-3">
            {dailySubmissions.map((day) => (
              <div key={day.date} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12">{day.date}</span>
                <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-blue-500 flex items-center justify-end pr-2"
                    style={{ width: `${(day.count / 20) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-white">{day.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Status Distribution
          </h2>
          <div className="space-y-4">
            {statusDistribution.map((status) => (
              <div key={status.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{status.label}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {status.value} ({total > 0 ? ((status.value / total) * 100).toFixed(1) : 0}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${status.color}`}
                    style={{ width: `${total > 0 ? (status.value / total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Checks Success Rate */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Verification Checks Success Rate
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: 'Document Quality', rate: 92 },
            { name: 'Face Match', rate: 88 },
            { name: 'Address Verified', rate: 85 },
            { name: 'No Fraud Detected', rate: 96 },
          ].map((check) => (
            <div key={check.name} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{check.name}</p>
              <div className="relative w-24 h-24 mx-auto">
                <svg className="transform -rotate-90 w-24 h-24">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - check.rate / 100)}`}
                    className="text-green-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {check.rate}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rejection Reasons */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Rejection Reasons
        </h2>
        <div className="space-y-3">
          {[
            { reason: 'Poor document quality', count: 8, percentage: 40 },
            { reason: 'Face verification failed', count: 6, percentage: 30 },
            { reason: 'Incomplete information', count: 4, percentage: 20 },
            { reason: 'Suspicious activity detected', count: 2, percentage: 10 },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item.reason}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
