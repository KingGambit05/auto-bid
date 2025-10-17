// app/(admin)/disputes/senior/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, AlertTriangle, Scale } from 'lucide-react';
import { DataTable, StatusBadge, Column } from '@/components/admin';
import { mockDisputeCases } from '@/lib/mockData/disputeData';
import { DisputeCase } from '@/types/admin';
import { formatDate, timeAgo } from '@/lib/utils';

export default function SeniorDisputePanelPage() {
  const router = useRouter();

  // Filter only escalated cases
  const escalatedCases = mockDisputeCases.filter((d) => d.status === 'escalated');

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
      title: 'Parties',
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
              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'timeline',
      title: 'Escalated',
      render: (value) => {
        const escalationEvent = value.find((e: any) => e.type === 'escalated');
        if (!escalationEvent) return '-';
        return (
          <div>
            <p className="text-sm text-gray-900 dark:text-white">
              {formatDate(escalationEvent.timestamp)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {timeAgo(escalationEvent.timestamp)}
            </p>
          </div>
        );
      },
    },
    {
      key: 'assignedTo',
      title: 'Assigned To',
      render: (value) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {value || 'Unassigned'}
        </span>
      ),
    },
    {
      key: 'id',
      title: 'Actions',
      render: (value) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/disputes/${value}`);
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          Review
        </button>
      ),
    },
  ];

  const urgentCount = escalatedCases.filter((c) => c.priority === 'urgent').length;
  const highCount = escalatedCases.filter((c) => c.priority === 'high').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Senior Dispute Panel
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                High-priority and escalated cases requiring senior review
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {urgentCount > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900 dark:text-red-300">
                {urgentCount} urgent {urgentCount === 1 ? 'case requires' : 'cases require'} immediate senior review
              </p>
              <p className="text-sm text-red-800 dark:text-red-400 mt-1">
                These cases may involve fraud, significant financial impact, or legal considerations
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Escalated</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {escalatedCases.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Urgent</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {urgentCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {highCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Awaiting Decision</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {escalatedCases.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Guidelines */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-3">
          Senior Panel Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-purple-900 dark:text-purple-200 mb-2">
              Cases Requiring Senior Review:
            </h4>
            <ul className="text-purple-800 dark:text-purple-400 space-y-1 list-disc list-inside">
              <li>Suspected fraud or criminal activity</li>
              <li>Disputes exceeding $25,000 in value</li>
              <li>Cases with conflicting evidence</li>
              <li>Potential legal implications</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-900 dark:text-purple-200 mb-2">
              Review Authority:
            </h4>
            <ul className="text-purple-800 dark:text-purple-400 space-y-1 list-disc list-inside">
              <li>Final decision-making authority</li>
              <li>Ability to issue refunds of any amount</li>
              <li>Can escalate to legal team</li>
              <li>Can impose account restrictions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Table */}
      {escalatedCases.length > 0 ? (
        <DataTable
          data={escalatedCases}
          columns={columns}
          keyExtractor={(item) => item.id}
          onRowClick={(dispute) => router.push(`/admin/disputes/${dispute.id}`)}
          emptyMessage="No escalated cases"
          pageSize={10}
          showPagination
        />
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Escalated Cases
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            All disputes are being handled at the standard level. Check back later for escalated cases requiring senior review.
          </p>
          <button
            onClick={() => router.push('/admin/disputes')}
            className="mt-4 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            View All Disputes
          </button>
        </div>
      )}
    </div>
  );
}
