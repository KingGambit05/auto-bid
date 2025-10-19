// app/admin/auctions/page.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Gavel, Search, PlayCircle, PauseCircle, Clock, XCircle, RotateCcw, TrendingUp } from 'lucide-react';
import { DataTable, Modal, ConfirmationModal, Column } from '@/components/admin';
import { formatDate, formatCurrency, timeAgo } from '@/lib/utils';

interface Auction {
  id: string;
  title: string;
  sellerName: string;
  currentBid: number;
  totalBids: number;
  startDate: string;
  endDate: string;
  status: 'live' | 'upcoming' | 'ended' | 'cancelled';
  category: string;
  autoExtendEnabled: boolean;
  reservePrice: number;
  viewCount: number;
}

// Mock data
const mockAuctions: Auction[] = [
  {
    id: 'AUC-001',
    title: '2023 Toyota Camry XSE',
    sellerName: 'John Doe',
    currentBid: 1250000,
    totalBids: 45,
    startDate: '2025-10-15T10:00:00',
    endDate: '2025-10-25T18:00:00',
    status: 'live',
    category: 'Sedan',
    autoExtendEnabled: true,
    reservePrice: 1200000,
    viewCount: 342,
  },
  {
    id: 'AUC-002',
    title: '2022 Honda CR-V EX',
    sellerName: 'Jane Smith',
    currentBid: 980000,
    totalBids: 32,
    startDate: '2025-10-16T09:00:00',
    endDate: '2025-10-26T17:00:00',
    status: 'live',
    category: 'SUV',
    autoExtendEnabled: false,
    reservePrice: 950000,
    viewCount: 287,
  },
  {
    id: 'AUC-003',
    title: '2024 Ford Mustang GT',
    sellerName: 'Mike Johnson',
    currentBid: 0,
    totalBids: 0,
    startDate: '2025-10-20T10:00:00',
    endDate: '2025-10-30T18:00:00',
    status: 'upcoming',
    category: 'Sports',
    autoExtendEnabled: true,
    reservePrice: 2500000,
    viewCount: 156,
  },
  {
    id: 'AUC-004',
    title: '2021 Nissan Altima SL',
    sellerName: 'Sarah Wilson',
    currentBid: 750000,
    totalBids: 28,
    startDate: '2025-10-10T10:00:00',
    endDate: '2025-10-18T18:00:00',
    status: 'ended',
    category: 'Sedan',
    autoExtendEnabled: false,
    reservePrice: 700000,
    viewCount: 412,
  },
];

export default function AuctionControlPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showRelistModal, setShowRelistModal] = useState(false);
  const [extendHours, setExtendHours] = useState('24');
  const [cancelReason, setCancelReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter auctions
  const filteredAuctions = useMemo(() => {
    return mockAuctions.filter((auction) => {
      const matchesSearch = searchTerm === '' ||
        auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || auction.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: mockAuctions.length,
      live: mockAuctions.filter((a) => a.status === 'live').length,
      upcoming: mockAuctions.filter((a) => a.status === 'upcoming').length,
      ended: mockAuctions.filter((a) => a.status === 'ended').length,
    };
  }, []);

  const columns: Column<Auction>[] = [
    {
      key: 'title',
      title: 'Auction',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">by {row.sellerName}</p>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => {
        const colorMap: Record<string, string> = {
          live: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
          upcoming: 'bg-blue-100 dark:bg-blue-900/30 text-green-800 dark:text-blue-400',
          ended: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400',
          cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
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
      key: 'viewCount',
      title: 'Views',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
      ),
    },
    {
      key: 'endDate',
      title: 'Ends',
      sortable: true,
      render: (value, row) => {
        if (row.status === 'upcoming') {
          return <span className="text-sm text-gray-500 dark:text-gray-400">Not started</span>;
        }
        return (
          <div>
            <p className="text-sm text-gray-900 dark:text-white">{formatDate(value as string)}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(value as string)}</p>
          </div>
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
            setSelectedAuction(row);
            setShowDetailModal(true);
          }}
          className="px-3 py-1.5 text-sm font-medium text-green-600 dark:text-blue-400 hover:bg-green-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          Manage
        </button>
      ),
    },
  ];

  const handleCancelAuction = async () => {
    if (!cancelReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowCancelModal(false);
    setShowDetailModal(false);
    setSelectedAuction(null);
    setCancelReason('');
  };

  const handleExtendAuction = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowExtendModal(false);
    setShowDetailModal(false);
    setSelectedAuction(null);
  };

  const handleRelistAuction = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowRelistModal(false);
    setShowDetailModal(false);
    setSelectedAuction(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Auction Control
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Monitor and manage all auctions across the platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Gavel className="w-5 h-5 text-green-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Auctions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <PlayCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Live</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.live}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-green-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
              <p className="text-2xl font-bold text-green-600 dark:text-blue-400">{stats.upcoming}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <PauseCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ended</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.ended}</p>
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
            <option value="live">Live</option>
            <option value="upcoming">Upcoming</option>
            <option value="ended">Ended</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredAuctions}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(auction) => {
          setSelectedAuction(auction);
          setShowDetailModal(true);
        }}
        emptyMessage="No auctions found"
        pageSize={15}
        showPagination
      />

      {/* Detail Modal */}
      {selectedAuction && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedAuction(null);
          }}
          title="Auction Management"
          size="lg"
        >
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {selectedAuction.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Category: {selectedAuction.category}</span>
                <span>•</span>
                <span>Seller: {selectedAuction.sellerName}</span>
              </div>
            </div>

            {/* Auction Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                  {selectedAuction.status}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Bid</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatCurrency(selectedAuction.currentBid)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Reserve Price</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatCurrency(selectedAuction.reservePrice)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Bids</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {selectedAuction.totalBids}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Views</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {selectedAuction.viewCount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Auto-Extend</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {selectedAuction.autoExtendEnabled ? 'Yes' : 'No'}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Start Date</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(selectedAuction.startDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">End Date</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(selectedAuction.endDate)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              {selectedAuction.status === 'live' && (
                <>
                  <button
                    onClick={() => setShowExtendModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    Extend Auction
                  </button>
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel Auction
                  </button>
                </>
              )}
              {selectedAuction.status === 'ended' && selectedAuction.currentBid < selectedAuction.reservePrice && (
                <button
                  onClick={() => setShowRelistModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Relist Auction
                </button>
              )}
              <button
                onClick={() => router.push(`/admin/bids?auction=${selectedAuction.id}`)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                View Bids
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Extend Modal */}
      {selectedAuction && (
        <Modal
          isOpen={showExtendModal}
          onClose={() => {
            setShowExtendModal(false);
            setExtendHours('24');
          }}
          title="Extend Auction"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Extend the auction "{selectedAuction.title}" by additional hours.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hours to Extend *
              </label>
              <input
                type="number"
                min="1"
                max="168"
                value={extendHours}
                onChange={(e) => setExtendHours(e.target.value)}
                placeholder="24"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Maximum: 168 hours (7 days)
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={handleExtendAuction}
                disabled={!extendHours || Number(extendHours) < 1 || isProcessing}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Extend Auction'}
              </button>
              <button
                onClick={() => {
                  setShowExtendModal(false);
                  setExtendHours('24');
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Cancel Modal */}
      {selectedAuction && (
        <Modal
          isOpen={showCancelModal}
          onClose={() => {
            setShowCancelModal(false);
            setCancelReason('');
          }}
          title="Cancel Auction"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Are you sure you want to cancel "{selectedAuction.title}"? All bids will be refunded.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reason for Cancellation *
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Provide a reason for cancelling this auction..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={handleCancelAuction}
                disabled={!cancelReason.trim() || isProcessing}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Cancel Auction'}
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason('');
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Relist Confirmation */}
      {selectedAuction && (
        <ConfirmationModal
          isOpen={showRelistModal}
          onClose={() => setShowRelistModal(false)}
          onConfirm={handleRelistAuction}
          title="Relist Auction"
          message={`Are you sure you want to relist "${selectedAuction.title}"? It will be made available for bidding again.`}
          confirmText="Relist"
          variant="info"
          isLoading={isProcessing}
        />
      )}
    </div>
  );
}
