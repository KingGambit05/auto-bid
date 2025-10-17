// app/(admin)/users/page.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Users as UsersIcon, Search, Lock, Unlock, Ban, Flag, CheckCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { DataTable, StatusBadge, FilterPanel, Column, Modal, ConfirmationModal } from '@/components/admin';
import { mockUsers } from '@/lib/mockData/userData';
import { User } from '@/types/admin';
import { formatDate, timeAgo, formatCurrency } from '@/lib/utils';

export default function UserManagementPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter users
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch = searchTerm === '' ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [searchTerm, statusFilter, roleFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: mockUsers.length,
      active: mockUsers.filter((u) => u.status === 'active').length,
      suspended: mockUsers.filter((u) => u.status === 'suspended').length,
      flagged: mockUsers.filter((u) => u.status === 'flagged').length,
      locked: mockUsers.filter((u) => u.status === 'locked').length,
    };
  }, []);

  const columns: Column<User>[] = [
    {
      key: 'name',
      title: 'User',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'role',
      title: 'Role',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full capitalize bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => {
        const colorMap: Record<string, string> = {
          active: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
          suspended: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400',
          flagged: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
          locked: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
          inactive: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${colorMap[value as string] || ''}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'trustScore',
      title: 'Trust Score',
      sortable: true,
      render: (value) => {
        const score = value as number;
        const color = score >= 80 ? 'text-green-600 dark:text-green-400' :
                      score >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400';
        const Icon = score >= 70 ? TrendingUp : TrendingDown;
        return (
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${color}`}>{score}</span>
            <Icon className={`w-4 h-4 ${color}`} />
          </div>
        );
      },
    },
    {
      key: 'kycStatus',
      title: 'KYC',
      sortable: true,
      render: (value) => {
        const colorMap: Record<string, string> = {
          approved: 'text-green-600 dark:text-green-400',
          pending: 'text-yellow-600 dark:text-yellow-400',
          rejected: 'text-red-600 dark:text-red-400',
        };
        const Icon = value === 'approved' ? CheckCircle : value === 'rejected' ? Ban : AlertTriangle;
        return (
          <div className="flex items-center gap-1">
            <Icon className={`w-4 h-4 ${colorMap[value as string] || ''}`} />
            <span className={`text-xs capitalize ${colorMap[value as string] || ''}`}>
              {value}
            </span>
          </div>
        );
      },
    },
    {
      key: 'joinedDate',
      title: 'Joined',
      sortable: true,
      render: (value) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{formatDate(value as string)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(value as string)}</p>
        </div>
      ),
    },
    {
      key: 'warnings',
      title: 'Warnings',
      sortable: true,
      render: (value, row) => (
        <div className="text-center">
          <p className={`text-sm font-medium ${(value as number) > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
            {value as number}
          </p>
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
            setSelectedUser(row);
            setShowProfileModal(true);
          }}
          className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          View Profile
        </button>
      ),
    },
  ];

  const handleSuspend = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowSuspendModal(false);
    setShowProfileModal(false);
    setSelectedUser(null);
    // In a real app, this would update the backend
  };

  const handleLock = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowLockModal(false);
    setShowProfileModal(false);
    setSelectedUser(null);
  };

  const handleUnlock = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowUnlockModal(false);
    setShowProfileModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage user accounts, trust scores, and access control
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <UsersIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Suspended</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.suspended}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Flag className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Flagged</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.flagged}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Ban className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Locked</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.locked}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="flagged">Flagged</option>
            <option value="locked">Locked</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredUsers}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(user) => {
          setSelectedUser(user);
          setShowProfileModal(true);
        }}
        emptyMessage="No users found"
        pageSize={15}
        showPagination
      />

      {/* User Profile Modal */}
      {selectedUser && (
        <Modal
          isOpen={showProfileModal}
          onClose={() => {
            setShowProfileModal(false);
            setSelectedUser(null);
          }}
          title={`User Profile: ${selectedUser.name}`}
          size="large"
        >
          <div className="space-y-6">
            {/* Status Alert */}
            {selectedUser.status === 'suspended' && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <p className="text-sm font-medium text-orange-900 dark:text-orange-300">
                  Account Suspended
                </p>
                <p className="text-sm text-orange-800 dark:text-orange-400 mt-1">
                  {selectedUser.suspensionReason}
                </p>
                {selectedUser.suspensionEndsAt && (
                  <p className="text-xs text-orange-700 dark:text-orange-500 mt-2">
                    Ends: {formatDate(selectedUser.suspensionEndsAt)}
                  </p>
                )}
              </div>
            )}

            {selectedUser.status === 'locked' && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm font-medium text-red-900 dark:text-red-300">
                  Account Locked
                </p>
                <p className="text-sm text-red-800 dark:text-red-400 mt-1">
                  {selectedUser.lockReason}
                </p>
              </div>
            )}

            {selectedUser.status === 'flagged' && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-300">
                  Account Flagged for Review
                </p>
                <p className="text-sm text-yellow-800 dark:text-yellow-400 mt-1">
                  {selectedUser.flagReason}
                </p>
              </div>
            )}

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{selectedUser.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Trust Score</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedUser.trustScore}/100</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">KYC Status</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{selectedUser.kycStatus}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Joined</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(selectedUser.joinedDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Active</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{timeAgo(selectedUser.lastActive)}</p>
              </div>
            </div>

            {/* Contact Info */}
            {(selectedUser.phone || selectedUser.address) && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 gap-3">
                  {selectedUser.phone && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedUser.phone}</p>
                    </div>
                  )}
                  {selectedUser.address && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedUser.address}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activity Stats */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Activity Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedUser.totalBids !== undefined && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Bids</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedUser.totalBids}</p>
                  </div>
                )}
                {selectedUser.wonAuctions !== undefined && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Won Auctions</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedUser.wonAuctions}</p>
                  </div>
                )}
                {selectedUser.totalListings !== undefined && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Listings</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedUser.totalListings}</p>
                  </div>
                )}
                {selectedUser.soldAuctions !== undefined && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Sold Auctions</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedUser.soldAuctions}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Financial Info */}
            {(selectedUser.totalSpent !== undefined || selectedUser.totalEarned !== undefined || selectedUser.accountBalance !== undefined) && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Financial Summary</h4>
                <div className="grid grid-cols-3 gap-4">
                  {selectedUser.totalSpent !== undefined && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Total Spent</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(selectedUser.totalSpent)}</p>
                    </div>
                  )}
                  {selectedUser.totalEarned !== undefined && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Total Earned</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(selectedUser.totalEarned)}</p>
                    </div>
                  )}
                  {selectedUser.accountBalance !== undefined && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Balance</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(selectedUser.accountBalance)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Moderation Info */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Moderation History</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Warnings</p>
                  <p className={`text-lg font-bold ${selectedUser.warnings > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                    {selectedUser.warnings}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Suspensions</p>
                  <p className={`text-lg font-bold ${selectedUser.suspensions > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                    {selectedUser.suspensions}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              {selectedUser.status === 'locked' ? (
                <button
                  onClick={() => setShowUnlockModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Unlock className="w-4 h-4" />
                  Unlock Account
                </button>
              ) : selectedUser.status !== 'suspended' ? (
                <>
                  <button
                    onClick={() => setShowSuspendModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Suspend Account
                  </button>
                  <button
                    onClick={() => setShowLockModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Lock className="w-4 h-4" />
                    Lock Account
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowUnlockModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Unlock className="w-4 h-4" />
                  Lift Suspension
                </button>
              )}
              <button
                onClick={() => router.push(`/admin/trust-score/${selectedUser.id}`)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                Manage Trust Score
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Modals */}
      {selectedUser && (
        <>
          <ConfirmationModal
            isOpen={showSuspendModal}
            onClose={() => setShowSuspendModal(false)}
            onConfirm={handleSuspend}
            title="Suspend Account"
            message={`Are you sure you want to suspend ${selectedUser.name}'s account? They will not be able to access the platform until the suspension is lifted.`}
            confirmText="Suspend"
            confirmVariant="warning"
            loading={isProcessing}
          />

          <ConfirmationModal
            isOpen={showLockModal}
            onClose={() => setShowLockModal(false)}
            onConfirm={handleLock}
            title="Lock Account"
            message={`Are you sure you want to permanently lock ${selectedUser.name}'s account? This action should only be taken for serious violations.`}
            confirmText="Lock Account"
            confirmVariant="danger"
            loading={isProcessing}
          />

          <ConfirmationModal
            isOpen={showUnlockModal}
            onClose={() => setShowUnlockModal(false)}
            onConfirm={handleUnlock}
            title={selectedUser.status === 'locked' ? 'Unlock Account' : 'Lift Suspension'}
            message={`Are you sure you want to restore access for ${selectedUser.name}? They will be able to use the platform again.`}
            confirmText={selectedUser.status === 'locked' ? 'Unlock' : 'Lift Suspension'}
            confirmVariant="primary"
            loading={isProcessing}
          />
        </>
      )}
    </div>
  );
}
