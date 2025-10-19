// app/admin/reviews/page.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Search, Flag, CheckCircle, XCircle, AlertTriangle, Eye } from 'lucide-react';
import { DataTable, Modal, ConfirmationModal, Column } from '@/components/admin';
import { formatDate, timeAgo } from '@/lib/utils';

interface Review {
  id: string;
  transactionId: string;
  reviewerName: string;
  reviewerId: string;
  revieweeName: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'flagged' | 'removed';
  flags: number;
  flagReasons?: string[];
  reviewType: 'buyer' | 'seller';
}

// Mock data
const mockReviews: Review[] = [
  {
    id: 'REV-001',
    transactionId: 'TXN-001',
    reviewerName: 'John Doe',
    reviewerId: 'USR-101',
    revieweeName: 'Jane Smith',
    revieweeId: 'USR-102',
    rating: 5,
    comment: 'Excellent seller! Car was exactly as described, smooth transaction.',
    createdAt: '2025-10-17T10:00:00',
    status: 'approved',
    flags: 0,
    reviewType: 'seller',
  },
  {
    id: 'REV-002',
    transactionId: 'TXN-002',
    reviewerName: 'Alice Johnson',
    reviewerId: 'USR-103',
    revieweeName: 'Bob Wilson',
    revieweeId: 'USR-104',
    rating: 1,
    comment: 'Terrible experience. Would not recommend.',
    createdAt: '2025-10-18T08:30:00',
    status: 'flagged',
    flags: 3,
    flagReasons: ['Inappropriate language', 'Unsubstantiated claims'],
    reviewType: 'buyer',
  },
  {
    id: 'REV-003',
    transactionId: 'TXN-003',
    reviewerName: 'Charlie Brown',
    reviewerId: 'USR-105',
    revieweeName: 'David Lee',
    revieweeId: 'USR-106',
    rating: 4,
    comment: 'Good communication, fast shipping. Vehicle had minor issues not mentioned.',
    createdAt: '2025-10-18T12:15:00',
    status: 'pending',
    flags: 0,
    reviewType: 'seller',
  },
  {
    id: 'REV-004',
    transactionId: 'TXN-004',
    reviewerName: 'Eva Martinez',
    reviewerId: 'USR-107',
    revieweeName: 'Frank Garcia',
    revieweeId: 'USR-108',
    rating: 5,
    comment: 'Perfect buyer! Payment was instant, very professional.',
    createdAt: '2025-10-17T16:45:00',
    status: 'approved',
    flags: 0,
    reviewType: 'buyer',
  },
];

export default function ReviewModerationPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removeReason, setRemoveReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return mockReviews.filter((review) => {
      const matchesSearch = searchTerm === '' ||
        review.reviewerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.revieweeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: mockReviews.length,
      pending: mockReviews.filter((r) => r.status === 'pending').length,
      flagged: mockReviews.filter((r) => r.status === 'flagged').length,
      approved: mockReviews.filter((r) => r.status === 'approved').length,
    };
  }, []);

  const columns: Column<Review>[] = [
    {
      key: 'reviewerName',
      title: 'Reviewer',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">→ {row.revieweeName}</p>
        </div>
      ),
    },
    {
      key: 'rating',
      title: 'Rating',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < (value as number) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
            />
          ))}
          <span className="text-sm font-medium text-gray-900 dark:text-white ml-1">{value}/5</span>
        </div>
      ),
    },
    {
      key: 'comment',
      title: 'Review',
      render: (value) => (
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{value}</p>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => {
        const colorMap: Record<string, string> = {
          approved: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
          pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
          flagged: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
          removed: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400',
        };
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${colorMap[value as string] || ''}`}>
            {value}
          </span>
        );
      },
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
      key: 'createdAt',
      title: 'Date',
      sortable: true,
      render: (value) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{formatDate(value as string)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(value as string)}</p>
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
            setSelectedReview(row);
            setShowDetailModal(true);
          }}
          className="px-3 py-1.5 text-sm font-medium text-green-600 dark:text-blue-400 hover:bg-green-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          Review
        </button>
      ),
    },
  ];

  const handleApproveReview = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowApproveModal(false);
    setShowDetailModal(false);
    setSelectedReview(null);
  };

  const handleRemoveReview = async () => {
    if (!removeReason.trim()) {
      alert('Please provide a reason for removal');
      return;
    }
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowRemoveModal(false);
    setShowDetailModal(false);
    setSelectedReview(null);
    setRemoveReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Review Moderation
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Moderate user reviews and maintain rating authenticity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Star className="w-5 h-5 text-green-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
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

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.approved}</p>
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
              placeholder="Search by reviewer, reviewee, or content..."
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
            <option value="pending">Pending</option>
            <option value="flagged">Flagged</option>
            <option value="approved">Approved</option>
            <option value="removed">Removed</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredReviews}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(review) => {
          setSelectedReview(review);
          setShowDetailModal(true);
        }}
        emptyMessage="No reviews found"
        pageSize={15}
        showPagination
      />

      {/* Detail Modal */}
      {selectedReview && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedReview(null);
          }}
          title="Review Details"
          size="lg"
        >
          <div className="space-y-6">
            {/* Flag Alert */}
            {selectedReview.flags > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900 dark:text-red-300">Review Flagged ({selectedReview.flags} reports)</p>
                    {selectedReview.flagReasons && (
                      <ul className="text-sm text-red-800 dark:text-red-400 mt-2 list-disc list-inside">
                        {selectedReview.flagReasons.map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Review Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${i < selectedReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                  />
                ))}
                <span className="text-lg font-bold text-gray-900 dark:text-white ml-2">{selectedReview.rating}/5</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{selectedReview.comment}</p>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Reviewer</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedReview.reviewerName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedReview.reviewerId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Reviewee ({selectedReview.reviewType})</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedReview.revieweeName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedReview.revieweeId}</p>
              </div>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Transaction ID</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedReview.transactionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(selectedReview.createdAt)}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              {selectedReview.status === 'pending' && (
                <button
                  onClick={() => setShowApproveModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Review
                </button>
              )}
              {selectedReview.status !== 'removed' && (
                <button
                  onClick={() => setShowRemoveModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Remove Review
                </button>
              )}
              <button
                onClick={() => router.push(`/admin/users`)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Profiles
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Modals */}
      {selectedReview && (
        <>
          <ConfirmationModal
            isOpen={showApproveModal}
            onClose={() => setShowApproveModal(false)}
            onConfirm={handleApproveReview}
            title="Approve Review"
            message={`Are you sure you want to approve this review? It will be visible to all users.`}
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
            title="Remove Review"
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Are you sure you want to remove this review? It will be hidden from all users.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Removal *
                </label>
                <textarea
                  value={removeReason}
                  onChange={(e) => setRemoveReason(e.target.value)}
                  placeholder="Provide a reason for removing this review..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={handleRemoveReview}
                  disabled={!removeReason.trim() || isProcessing}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Remove Review'}
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
