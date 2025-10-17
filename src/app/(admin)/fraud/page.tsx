// app/(admin)/fraud/page.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, AlertTriangle, Eye, CheckCircle, XCircle, Clock, User, MapPin, Monitor } from 'lucide-react';
import { DataTable, StatusBadge, Modal, Column } from '@/components/admin';
import { mockFraudAlerts } from '@/lib/mockData/fraudData';
import { FraudAlert } from '@/types/admin';
import { formatDate, timeAgo } from '@/lib/utils';

export default function FraudReviewPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter alerts
  const filteredAlerts = useMemo(() => {
    return mockFraudAlerts.filter((alert) => {
      const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
      const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
      return matchesStatus && matchesSeverity;
    });
  }, [statusFilter, severityFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: mockFraudAlerts.length,
      open: mockFraudAlerts.filter((a) => a.status === 'open').length,
      investigating: mockFraudAlerts.filter((a) => a.status === 'investigating').length,
      critical: mockFraudAlerts.filter((a) => a.severity === 'critical').length,
    };
  }, []);

  const columns: Column<FraudAlert>[] = [
    {
      key: 'severity',
      title: 'Severity',
      sortable: true,
      render: (value) => {
        const colorMap: Record<string, string> = {
          critical: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
          high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400',
          medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
          low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${colorMap[value as string] || ''}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'type',
      title: 'Type',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
          {(value as string).replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'userName',
      title: 'User',
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{row.userEmail}</p>
        </div>
      ),
    },
    {
      key: 'description',
      title: 'Description',
      render: (value) => (
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
          {value as string}
        </p>
      ),
    },
    {
      key: 'detectedAt',
      title: 'Detected',
      sortable: true,
      render: (value) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{formatDate(value as string)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(value as string)}</p>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => {
        const colorMap: Record<string, string> = {
          open: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
          investigating: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
          resolved: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
          monitoring: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${colorMap[value as string] || ''}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'id',
      title: 'Actions',
      render: (value, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedAlert(row);
            setShowDetailModal(true);
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          Review
        </button>
      ),
    },
  ];

  const handleMarkResolved = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowDetailModal(false);
    setSelectedAlert(null);
  };

  const handleMarkInvestigating = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowDetailModal(false);
    setSelectedAlert(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Fraud Review Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Monitor and investigate suspicious activity and fraud alerts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Open</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.open}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Investigating</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.investigating}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.critical}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {stats.critical > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900 dark:text-red-300">
                {stats.critical} critical {stats.critical === 1 ? 'alert requires' : 'alerts require'} immediate attention
              </p>
              <p className="text-sm text-red-800 dark:text-red-400 mt-1">
                These alerts may indicate serious fraud, identity theft, or organized crime
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="monitoring">Monitoring</option>
          </select>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredAlerts}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(alert) => {
          setSelectedAlert(alert);
          setShowDetailModal(true);
        }}
        emptyMessage="No fraud alerts found"
        pageSize={10}
        showPagination
      />

      {/* Detail Modal */}
      {selectedAlert && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedAlert(null);
          }}
          title="Fraud Alert Details"
          size="large"
        >
          <div className="space-y-6">
            {/* Severity Badge */}
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 text-sm font-medium rounded-full capitalize ${
                selectedAlert.severity === 'critical'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                  : selectedAlert.severity === 'high'
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400'
                  : selectedAlert.severity === 'medium'
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
              }`}>
                {selectedAlert.severity} Severity
              </span>
              <span className={`px-3 py-1.5 text-sm font-medium rounded-full capitalize ${
                selectedAlert.status === 'open'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                  : selectedAlert.status === 'investigating'
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                  : selectedAlert.status === 'resolved'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
              }`}>
                {selectedAlert.status}
              </span>
            </div>

            {/* User Info */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedAlert.userName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAlert.userEmail}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">User ID: {selectedAlert.userId}</p>
                </div>
              </div>
            </div>

            {/* Alert Details */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Alert Type</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                {selectedAlert.type.replace('_', ' ')}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {selectedAlert.description}
              </p>
            </div>

            {/* Indicators */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Fraud Indicators</h4>
              <ul className="space-y-2">
                {selectedAlert.indicators.map((indicator, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>

            {/* IP Addresses */}
            {selectedAlert.ipAddresses && selectedAlert.ipAddresses.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">IP Addresses</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.ipAddresses.map((ip, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-900 dark:text-white font-mono"
                    >
                      <MapPin className="w-3 h-3" />
                      {ip}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Devices */}
            {selectedAlert.devices && selectedAlert.devices.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Devices</h4>
                <div className="space-y-2">
                  {selectedAlert.devices.map((device, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                    >
                      <Monitor className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white capitalize">
                        {device.type}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {device.os}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {device.browser}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Users */}
            {selectedAlert.relatedUsers && selectedAlert.relatedUsers.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Related Accounts</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.relatedUsers.map((userId, index) => (
                    <button
                      key={index}
                      onClick={() => router.push(`/admin/users`)}
                      className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-sm transition-colors"
                    >
                      {userId}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {selectedAlert.notes && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Investigation Notes</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  {selectedAlert.notes}
                </p>
              </div>
            )}

            {/* Resolution */}
            {selectedAlert.resolution && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-green-900 dark:text-green-300 mb-2">Resolution</h4>
                <p className="text-sm text-green-800 dark:text-green-400">{selectedAlert.resolution}</p>
                {selectedAlert.resolvedAt && (
                  <p className="text-xs text-green-700 dark:text-green-500 mt-2">
                    Resolved: {formatDate(selectedAlert.resolvedAt)}
                  </p>
                )}
              </div>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div>Detected: {formatDate(selectedAlert.detectedAt)}</div>
              {selectedAlert.assignedTo && (
                <>
                  <span>•</span>
                  <div>Assigned to: {selectedAlert.assignedTo}</div>
                </>
              )}
            </div>

            {/* Actions */}
            {selectedAlert.status !== 'resolved' && (
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                {selectedAlert.status !== 'investigating' && (
                  <button
                    onClick={handleMarkInvestigating}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 transition-colors"
                  >
                    {isProcessing ? 'Processing...' : 'Mark as Investigating'}
                  </button>
                )}
                <button
                  onClick={handleMarkResolved}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Mark as Resolved'}
                </button>
                <button
                  onClick={() => router.push(`/admin/users`)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  View User Profile
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
