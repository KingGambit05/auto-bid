// app/(admin)/features/page.tsx
"use client";

import React, { useState } from 'react';
import { Flag, ToggleLeft, ToggleRight, Users, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { DataTable, Modal, Column } from '@/components/admin';
import { mockFeatureFlags } from '@/lib/mockData/systemData';
import { FeatureFlag } from '@/types/admin';
import { formatDate } from '@/lib/utils';

export default function FeatureFlagsPage() {
  const [selectedFlag, setSelectedFlag] = useState<FeatureFlag | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggleFlag = async (flag: FeatureFlag) => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsProcessing(false);
    // In real app, this would update the backend
  };

  const handleUpdateRollout = async (flag: FeatureFlag, percentage: number) => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsProcessing(false);
  };

  const columns: Column<FeatureFlag>[] = [
    {
      key: 'name',
      title: 'Feature',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{row.description}</p>
        </div>
      ),
    },
    {
      key: 'key',
      title: 'Key',
      render: (value) => (
        <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{value}</span>
      ),
    },
    {
      key: 'enabled',
      title: 'Status',
      sortable: true,
      render: (value, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFlag(row);
          }}
          disabled={isProcessing}
          className="flex items-center gap-2"
        >
          {value ? (
            <>
              <ToggleRight className="w-6 h-6 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Enabled</span>
            </>
          ) : (
            <>
              <ToggleLeft className="w-6 h-6 text-gray-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Disabled</span>
            </>
          )}
        </button>
      ),
    },
    {
      key: 'rolloutPercentage',
      title: 'Rollout',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{value}%</span>
        </div>
      ),
    },
    {
      key: 'targetRoles',
      title: 'Target',
      render: (value, row) => {
        if (row.targetUsers && row.targetUsers.length > 0) {
          return (
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {row.targetUsers.length} specific users
            </span>
          );
        }
        if (value && (value as string[]).length > 0) {
          return (
            <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
              {(value as string[]).join(', ')}
            </span>
          );
        }
        return <span className="text-xs text-gray-500 dark:text-gray-400">All users</span>;
      },
    },
    {
      key: 'updatedAt',
      title: 'Last Updated',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">{formatDate(value as string)}</span>
      ),
    },
    {
      key: 'id',
      title: 'Actions',
      render: (value, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFlag(row);
            setShowDetailModal(true);
          }}
          className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          Configure
        </button>
      ),
    },
  ];

  const stats = {
    total: mockFeatureFlags.length,
    enabled: mockFeatureFlags.filter(f => f.enabled).length,
    fullRollout: mockFeatureFlags.filter(f => f.rolloutPercentage === 100).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Feature Flags
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage feature rollouts and experimental features
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Flag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Features</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enabled</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.enabled}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Full Rollout</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.fullRollout}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Flag className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
              Feature Flag Best Practices
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-400 mt-1">
              Start with low rollout percentages for new features. Monitor metrics closely before increasing rollout. Use targeted users for beta testing.
            </p>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={mockFeatureFlags}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(flag) => {
          setSelectedFlag(flag);
          setShowDetailModal(true);
        }}
        emptyMessage="No feature flags found"
        pageSize={10}
        showPagination
      />

      {/* Detail Modal */}
      {selectedFlag && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedFlag(null);
          }}
          title={`Configure: ${selectedFlag.name}`}
          size="large"
        >
          <div className="space-y-6">
            {/* Status Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Feature Status</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {selectedFlag.description}
                </p>
              </div>
              <button
                onClick={() => handleToggleFlag(selectedFlag)}
                disabled={isProcessing}
                className="flex items-center gap-2"
              >
                {selectedFlag.enabled ? (
                  <>
                    <ToggleRight className="w-8 h-8 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Enabled</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Disabled</span>
                  </>
                )}
              </button>
            </div>

            {/* Rollout Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rollout Percentage: {selectedFlag.rolloutPercentage}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={selectedFlag.rolloutPercentage}
                onChange={(e) => handleUpdateRollout(selectedFlag, parseInt(e.target.value))}
                disabled={isProcessing}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Targeting */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Targeting</h4>
              <div className="space-y-3">
                {selectedFlag.targetRoles && selectedFlag.targetRoles.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Target Roles</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedFlag.targetRoles.map((role) => (
                          <span
                            key={role}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 capitalize"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedFlag.targetUsers && selectedFlag.targetUsers.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Target Users</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedFlag.targetUsers.map((userId) => (
                          <span
                            key={userId}
                            className="px-2 py-1 text-xs font-mono rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            {userId}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {(!selectedFlag.targetRoles || selectedFlag.targetRoles.length === 0) &&
                 (!selectedFlag.targetUsers || selectedFlag.targetUsers.length === 0) && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    No specific targeting - available to all users based on rollout percentage
                  </p>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Created By</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedFlag.createdBy}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Created At</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(selectedFlag.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Feature Key</p>
                <p className="text-sm font-mono text-gray-900 dark:text-white">{selectedFlag.key}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(selectedFlag.updatedAt)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => handleUpdateRollout(selectedFlag, 100)}
                disabled={isProcessing || selectedFlag.rolloutPercentage === 100}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Roll out to 100%
              </button>
              <button
                onClick={() => handleUpdateRollout(selectedFlag, 0)}
                disabled={isProcessing || selectedFlag.rolloutPercentage === 0}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Roll back to 0%
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
