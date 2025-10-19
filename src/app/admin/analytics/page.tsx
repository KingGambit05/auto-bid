// app/admin/analytics/page.tsx
"use client";

import React, { useState } from 'react';
import { BarChart3, Download, Users, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';
import { StatCard } from '@/components/admin';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [exportFormat, setExportFormat] = useState('csv');

  const stats = {
    totalUsers: 2547,
    totalTransactions: 1234,
    totalRevenue: 45678900,
    averageTransactionValue: 982000,
    userGrowth: 15.3,
    revenueGrowth: 22.8,
  };

  const handleExport = () => {
    alert(`Exporting analytics data as ${exportFormat.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics & Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Platform performance metrics and data export
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Users"
          value={formatNumber(stats.totalUsers)}
          icon={Users}
          iconClassName="bg-blue-100 dark:bg-blue-900/30"
          trend={{ value: stats.userGrowth, isPositive: true }}
        />
        <StatCard
          title="Total Transactions"
          value={formatNumber(stats.totalTransactions)}
          icon={ShoppingCart}
          iconClassName="bg-green-100 dark:bg-green-900/30"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          iconClassName="bg-purple-100 dark:bg-purple-900/30"
          trend={{ value: stats.revenueGrowth, isPositive: true }}
        />
      </div>

      {/* User Statistics */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          User Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">KYC Verified</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1,847</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">72.5% of total</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Sellers</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">489</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">19.2% of total</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Buyers</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1,923</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">75.5% of total</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Suspended</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">12</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">0.5% of total</p>
          </div>
        </div>
      </div>

      {/* Transaction Success Rates */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Transaction Success Rates
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">94.2%</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
            <p className="text-2xl font-bold text-green-600 dark:text-blue-400">3.8%</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Disputed</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1.5%</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">0.5%</p>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Export Reports
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
          >
            <option value="csv">CSV Format</option>
            <option value="xlsx">Excel Format</option>
            <option value="pdf">PDF Format</option>
          </select>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
}
