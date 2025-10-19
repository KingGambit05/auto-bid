// app/(admin)/listings/page.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { List, Flag, CheckCircle, XCircle, Eye, Search, AlertTriangle } from 'lucide-react';
import { DataTable, StatusBadge, Modal, ConfirmationModal, Column } from '@/components/admin';
import { mockListings } from '@/lib/mockData/listingData';
import { ListingManagement } from '@/types/admin';
import { formatDate, formatCurrency } from '@/lib/utils';

export default function ListingManagementPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedListing, setSelectedListing] = useState<ListingManagement | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removeReason, setRemoveReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter listings
  const filteredListings = useMemo(() => {
    return mockListings.filter((listing) => {
      const matchesSearch = searchTerm === '' ||
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: mockListings.length,
      active: mockListings.filter((l) => l.status === 'active').length,
      pending: mockListings.filter((l) => l.status === 'pending').length,
      flagged: mockListings.filter((l) => l.status === 'flagged').length,
    };
  }, []);

  const columns: Column<ListingManagement>[] = [
    {
      key: 'title',
      title: 'Listing',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">by {row.sellerName}</p>
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => {
        const colorMap: Record<string, string> = {
          active: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
          pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
          flagged: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
          removed: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400',
          sold: 'bg-blue-100 dark:bg-blue-900/30 text-green-800 dark:text-blue-400',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${colorMap[value as string] || ''}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'currentBid',
      title: 'Current Bid',
      sortable: true,
      render: (value) => (
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {formatCurrency(value as number)}
        </span>
      ),
    },
    {
      key: 'totalBids',
      title: 'Bids',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
      ),
    },
    {
      key: 'flags',
      title: 'Flags',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          {(value as number) > 0 ? (
            <>
              <Flag className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-600 dark:text-red-400">{value as number}</span>
            </>
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">0</span>
          )}
        </div>
      ),
    },
    {
      key: 'endDate',
      title: 'Ends',
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
            setSelectedListing(row);
            setShowDetailModal(true);
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-600 dark:text-blue-400 hover:bg-green-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          Review
        </button>
      ),
    },
  ];

  const handleApproveListing = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowApproveModal(false);
    setShowDetailModal(false);
    setSelectedListing(null);
  };

  const handleRemoveListing = async () => {
    if (!removeReason.trim()) {
      alert('Please provide a reason for removal');
      return;
    }
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowRemoveModal(false);
    setShowDetailModal(false);
    setSelectedListing(null);
    setRemoveReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Listing Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Review, approve, and moderate vehicle listings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <List className="w-5 h-5 text-green-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Listings</p>
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
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Flag className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Flagged</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.flagged}</p>
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
              placeholder="Search by title or seller..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="flagged">Flagged</option>
            <option value="removed">Removed</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredListings}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(listing) => {
          setSelectedListing(listing);
          setShowDetailModal(true);
        }}
        emptyMessage="No listings found"
        pageSize={15}
        showPagination
      />

      {/* Detail Modal */}
      {selectedListing && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedListing(null);
          }}
          title="Listing Details"
          size="lg"
        >
          <div className="space-y-6">
            {/* Violation Alert */}
            {selectedListing.violationReason && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900 dark:text-red-300">Violation Detected</p>
                    <p className="text-sm text-red-800 dark:text-red-400 mt-1">{selectedListing.violationReason}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {selectedListing.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Category: {selectedListing.category}</span>
                <span>•</span>
                <span>Seller: {selectedListing.sellerName}</span>
              </div>
            </div>

            {/* Auction Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Bid</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatCurrency(selectedListing.currentBid)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Bids</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {selectedListing.totalBids}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Flags</p>
                <p className={`text-lg font-bold ${selectedListing.flags > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                  {selectedListing.flags}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                  {selectedListing.status}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(selectedListing.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ends</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(selectedListing.endDate)}
                </p>
              </div>
            </div>

            {/* Review Info */}
            {selectedListing.reviewedBy && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reviewed By</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedListing.reviewedBy}
                </p>
                {selectedListing.reviewedAt && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    on {formatDate(selectedListing.reviewedAt)}
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              {selectedListing.status === 'pending' && (
                <button
                  onClick={() => setShowApproveModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Listing
                </button>
              )}
              {selectedListing.status !== 'removed' && selectedListing.status !== 'sold' && (
                <button
                  onClick={() => setShowRemoveModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Remove Listing
                </button>
              )}
              <button
                onClick={() => router.push(`/admin/users`)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                View Seller Profile
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Modals */}
      {selectedListing && (
        <>
          <ConfirmationModal
            isOpen={showApproveModal}
            onClose={() => setShowApproveModal(false)}
            onConfirm={handleApproveListing}
            title="Approve Listing"
            message={`Are you sure you want to approve "${selectedListing.title}"? It will be published and made visible to all buyers.`}
            confirmText="Approve"
            variant="info"
            isLoading={isProcessing}
          />

          <Modal
            isOpen={showRemoveModal}
            onClose={() => {
              setShowRemoveModal(false);
              setRemoveReason('');
            }}
            title="Remove Listing"
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Are you sure you want to remove "{selectedListing.title}"? This action will hide it from all users.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Removal *
                </label>
                <textarea
                  value={removeReason}
                  onChange={(e) => setRemoveReason(e.target.value)}
                  placeholder="Provide a reason for removing this listing..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={handleRemoveListing}
                  disabled={!removeReason.trim() || isProcessing}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Remove Listing'}
                </button>
                <button
                  onClick={() => {
                    setShowRemoveModal(false);
                    setRemoveReason('');
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}
