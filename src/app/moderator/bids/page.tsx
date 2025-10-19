// app/moderator/bids/page.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TrendingUp, Search, AlertTriangle, DollarSign, RotateCcw, Eye, Flag } from 'lucide-react';
import { DataTable, Modal, Column } from '@/components/admin';
import { formatDate, formatCurrency, timeAgo } from '@/lib/utils';

interface Bid {
  id: string;
  auctionId: string;
  auctionTitle: string;
  bidderName: string;
  bidderId: string;
  amount: number;
  bidTime: string;
  isAutoBid: boolean;
  ipAddress: string;
  status: 'active' | 'outbid' | 'winning' | 'refunded' | 'cancelled';
  suspicious: boolean;
  suspiciousReason?: string;
}

// Mock data (same as admin)
const mockBids: Bid[] = [
  {
    id: 'BID-001',
    auctionId: 'AUC-001',
    auctionTitle: '2023 Toyota Camry XSE',
    bidderName: 'Alice Johnson',
    bidderId: 'USR-101',
    amount: 1250000,
    bidTime: '2025-10-18T14:30:00',
    isAutoBid: false,
    ipAddress: '192.168.1.1',
    status: 'winning',
    suspicious: false,
  },
  {
    id: 'BID-002',
    auctionId: 'AUC-001',
    auctionTitle: '2023 Toyota Camry XSE',
    bidderName: 'Bob Smith',
    bidderId: 'USR-102',
    amount: 1240000,
    bidTime: '2025-10-18T14:25:00',
    isAutoBid: true,
    ipAddress: '192.168.1.2',
    status: 'outbid',
    suspicious: false,
  },
  {
    id: 'BID-003',
    auctionId: 'AUC-001',
    auctionTitle: '2023 Toyota Camry XSE',
    bidderName: 'Charlie Brown',
    bidderId: 'USR-103',
    amount: 1230000,
    bidTime: '2025-10-18T14:20:00',
    isAutoBid: false,
    ipAddress: '192.168.1.1',
    status: 'outbid',
    suspicious: true,
    suspiciousReason: 'Same IP as highest bidder',
  },
];

export default function ModeratorBidMonitoringPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auctionFilter = searchParams?.get('auction') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [suspiciousOnly, setSuspiciousOnly] = useState(false);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filter bids
  const filteredBids = useMemo(() => {
    return mockBids.filter((bid) => {
      const matchesSearch = searchTerm === '' ||
        bid.auctionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bid.bidderName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || bid.status === statusFilter;
      const matchesAuction = !auctionFilter || bid.auctionId === auctionFilter;
      const matchesSuspicious = !suspiciousOnly || bid.suspicious;
      return matchesSearch && matchesStatus && matchesAuction && matchesSuspicious;
    });
  }, [searchTerm, statusFilter, auctionFilter, suspiciousOnly]);

  // Stats
  const stats = useMemo(() => {
    const total = mockBids.length;
    const active = mockBids.filter((b) => b.status === 'active' || b.status === 'winning').length;
    const suspicious = mockBids.filter((b) => b.suspicious).length;
    const autoBids = mockBids.filter((b) => b.isAutoBid).length;

    return { total, active, suspicious, autoBids };
  }, []);

  const columns: Column<Bid>[] = [
    {
      key: 'auctionTitle',
      title: 'Auction',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {row.isAutoBid && <span className="text-green-600 dark:text-blue-400">Auto-Bid • </span>}
            {row.bidderName}
          </p>
        </div>
      ),
    },
    {
      key: 'amount',
      title: 'Amount',
      sortable: true,
      render: (value) => (
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {formatCurrency(value as number)}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => {
        const colorMap: Record<string, string> = {
          winning: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
          active: 'bg-blue-100 dark:bg-blue-900/30 text-green-800 dark:text-blue-400',
          outbid: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400',
          refunded: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
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
      key: 'bidTime',
      title: 'Bid Time',
      sortable: true,
      render: (value) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{formatDate(value as string)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(value as string)}</p>
        </div>
      ),
    },
    {
      key: 'suspicious',
      title: 'Flags',
      sortable: true,
      render: (value, row) => (
        <div>
          {value ? (
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-xs text-red-600 dark:text-red-400">Suspicious</span>
            </div>
          ) : (
            <span className="text-xs text-gray-500 dark:text-gray-400">-</span>
          )}
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
            setSelectedBid(row);
            setShowDetailModal(true);
          }}
          className="px-3 py-1.5 text-sm font-medium text-green-600 dark:text-blue-400 hover:bg-green-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Bid Monitoring
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View bidding activity and flag suspicious patterns
        </p>
      </div>

      {/* View-Only Notice */}
      <div className="bg-green-50 dark:bg-blue-900/20 border border-green-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-green-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300">View-Only Access</p>
            <p className="text-sm text-green-800 dark:text-blue-400 mt-1">
              As a moderator, you can view bid information but cannot cancel or refund bids. Contact an admin for bid management actions.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Bids</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Flag className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Suspicious</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.suspicious}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <RotateCcw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Auto-Bids</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.autoBids}</p>
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
              placeholder="Search by auction or bidder..."
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
            <option value="winning">Winning</option>
            <option value="active">Active</option>
            <option value="outbid">Outbid</option>
            <option value="refunded">Refunded</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer">
            <input
              type="checkbox"
              checked={suspiciousOnly}
              onChange={(e) => setSuspiciousOnly(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
            <span className="text-sm font-medium">Suspicious Only</span>
          </label>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredBids}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(bid) => {
          setSelectedBid(bid);
          setShowDetailModal(true);
        }}
        emptyMessage="No bids found"
        pageSize={15}
        showPagination
      />

      {/* Detail Modal - View Only */}
      {selectedBid && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedBid(null);
          }}
          title="Bid Details (View Only)"
          size="lg"
        >
          <div className="space-y-6">
            {/* Suspicious Alert */}
            {selectedBid.suspicious && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900 dark:text-red-300">Suspicious Activity Detected</p>
                    <p className="text-sm text-red-800 dark:text-red-400 mt-1">{selectedBid.suspiciousReason}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Auction Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {selectedBid.auctionTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Auction ID: {selectedBid.auctionId}
              </p>
            </div>

            {/* Bid Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bid Amount</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatCurrency(selectedBid.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                  {selectedBid.status}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bid Type</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {selectedBid.isAutoBid ? 'Auto-Bid' : 'Manual'}
                </p>
              </div>
            </div>

            {/* Bidder Info */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Bidder Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedBid.bidderName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">User ID</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedBid.bidderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">IP Address</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedBid.ipAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bid Time</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(selectedBid.bidTime)}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
