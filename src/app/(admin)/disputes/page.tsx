// app/(admin)/disputes/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scale, Eye, TrendingUp, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { DataTable, StatusBadge, TabNavigation, Column, Tab } from '@/components/admin';
import { mockDisputeCases } from '@/lib/mockData/disputeData';
import { DisputeCase } from '@/types/admin';
import { formatDate, timeAgo, formatCurrency } from '@/lib/utils';

export default function DisputeDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  // Filter disputes by status
  const filteredDisputes = mockDisputeCases.filter((dispute) => {
    if (activeTab === 'all') return true;
    return dispute.status === activeTab;
  });

  // Tabs
  const tabs: Tab[] = [
    { id: 'all', label: 'All Cases', count: mockDisputeCases.length },
    { id: 'open', label: 'Open', count: mockDisputeCases.filter((d) => d.status === 'open').length },
    { id: 'investigating', label: 'Investigating', count: mockDisputeCases.filter((d) => d.status === 'investigating').length },
    { id: 'escalated', label: 'Escalated', count: mockDisputeCases.filter((d) => d.status === 'escalated').length },
    { id: 'resolved', label: 'Resolved', count: mockDisputeCases.filter((d) => d.status === 'resolved').length },
  ];

  const columns: Column<DisputeCase>[] = [
    {
      key: 'caseNumber',
      title: 'Case #',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">{value}</span>
      ),
    },
    {
      key: 'auctionTitle',
      title: 'Auction',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-900 dark:text-white">{value}</span>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
          {value.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'initiatorName',
      title: 'Initiated By',
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">vs {row.respondentName}</p>
        </div>
      ),
    },
    {
      key: 'priority',
      title: 'Priority',
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
            value === 'urgent'
              ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
              : value === 'high'
              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400'
              : value === 'medium'
              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'createdAt',
      title: 'Created',
      sortable: true,
      render: (value) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{formatDate(value)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(value)}</p>
        </div>
      ),
    },
    {
      key: 'id',
      title: 'Actions',
      render: (value, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/disputes/${value}`);
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          Review
        </button>
      ),
    },
  ];

  // Calculate stats
  const totalActive = mockDisputeCases.filter((d) =>
    d.status === 'open' || d.status === 'investigating' || d.status === 'escalated'
  ).length;
  const urgentCases = mockDisputeCases.filter((d) => d.priority === 'urgent' && d.status !== 'resolved').length;
  const escalatedCases = mockDisputeCases.filter((d) => d.status === 'escalated').length;
  const avgResolutionTime = 3.5; // Mock data (days)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dispute Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Review and resolve transaction disputes
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Scale className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Cases</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalActive}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Urgent</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{urgentCases}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Escalated</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{escalatedCases}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Resolution</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgResolutionTime}d</p>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Queue Alert */}
      {urgentCases > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900 dark:text-red-300">
                {urgentCases} urgent {urgentCases === 1 ? 'case requires' : 'cases require'} immediate attention
              </p>
              <p className="text-sm text-red-800 dark:text-red-400 mt-1">
                Review urgent cases to prevent further escalation
              </p>
            </div>
            <button
              onClick={() => setActiveTab('all')}
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
            >
              View All
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => router.push('/admin/disputes/senior')}
          className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-left"
        >
          <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
          <p className="text-sm font-medium text-purple-900 dark:text-purple-300">Senior Panel</p>
          <p className="text-xs text-purple-700 dark:text-purple-400 mt-1">
            {escalatedCases} escalated cases
          </p>
        </button>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
          <p className="text-sm font-medium text-green-900 dark:text-green-300">Resolution Rate</p>
          <p className="text-xs text-green-700 dark:text-green-400 mt-1">
            {Math.round((mockDisputeCases.filter(d => d.status === 'resolved').length / mockDisputeCases.length) * 100)}% resolved
          </p>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
          <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Total Cases</p>
          <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
            {mockDisputeCases.length} all time
          </p>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mb-2" />
          <p className="text-sm font-medium text-yellow-900 dark:text-yellow-300">In Progress</p>
          <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
            {mockDisputeCases.filter(d => d.status === 'investigating').length} investigating
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredDisputes}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(dispute) => router.push(`/admin/disputes/${dispute.id}`)}
        emptyMessage="No dispute cases found"
        pageSize={10}
        showPagination
      />
    </div>
  );
}
