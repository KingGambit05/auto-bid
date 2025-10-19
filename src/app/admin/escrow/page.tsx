// app/(admin)/escrow/page.tsx
"use client";

import React, { useState } from 'react';
import { Download, CheckCircle, XCircle } from 'lucide-react';
import { DataTable, StatusBadge, ConfirmationModal, Column } from '@/components/admin';
import { mockEscrowTransactions } from '@/lib/mockData/transactionData';
import { EscrowTransaction, EscrowStatus } from '@/types/admin';
import { formatCurrency, formatDate, timeAgo } from '@/lib/utils';

export default function EscrowManagementPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<EscrowTransaction | null>(null);
  const [actionType, setActionType] = useState<'release' | 'refund' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setActionType(null);
    setSelectedTransaction(null);
  };

  // Calculate totals
  const totalHeld = mockEscrowTransactions
    .filter((t: EscrowTransaction) => t.escrowStatus === 'held')
    .reduce((sum: number, t: EscrowTransaction) => sum + t.amount, 0);
  const totalReleased = mockEscrowTransactions
    .filter((t: EscrowTransaction) => t.escrowStatus === 'released')
    .reduce((sum: number, t: EscrowTransaction) => sum + t.amount, 0);
  const totalRefunded = mockEscrowTransactions
    .filter((t: EscrowTransaction) => t.escrowStatus === 'refunded')
    .reduce((sum: number, t: EscrowTransaction) => sum + t.amount, 0);

  const columns: Column<EscrowTransaction>[] = [
    {
      key: 'id',
      title: 'Escrow ID',
      render: (value: string) => (
        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{value}</span>
      ),
    },
    {
      key: 'auctionTitle',
      title: 'Auction',
      sortable: true,
    },
    {
      key: 'buyerName',
      title: 'Buyer',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-900 dark:text-white">{value}</span>
      ),
    },
    {
      key: 'sellerName',
      title: 'Seller',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-900 dark:text-white">{value}</span>
      ),
    },
    {
      key: 'amount',
      title: 'Amount',
      sortable: true,
      render: (value: number) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      key: 'heldSince',
      title: 'Held Since',
      sortable: true,
      render: (value: string) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{formatDate(value)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(value)}</p>
        </div>
      ),
    },
    {
      key: 'escrowStatus',
      title: 'Status',
      sortable: true,
  render: (value: EscrowStatus) => <StatusBadge status={value} />,
    },
    {
      key: 'id',
      title: 'Actions',
  render: (value: string, row: EscrowTransaction) => {
        if (row.escrowStatus !== 'held') return <span className="text-sm text-gray-400">-</span>;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTransaction(row);
                setActionType('release');
              }}
              className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
              title="Release"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTransaction(row);
                setActionType('refund');
              }}
              className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              title="Refund"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Escrow Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage held funds and process releases/refunds
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Held</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
            {formatCurrency(totalHeld)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Released</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {formatCurrency(totalReleased)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Refunded</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
            {formatCurrency(totalRefunded)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Escrows</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {mockEscrowTransactions.filter((t) => t.escrowStatus === 'held').length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={mockEscrowTransactions}
        columns={columns}
        keyExtractor={(item: EscrowTransaction) => item.id}
        emptyMessage="No escrow transactions found"
        pageSize={10}
        showPagination
      />

      {/* Action Confirmation Modals */}
      {selectedTransaction && actionType === 'release' && (
        <ConfirmationModal
          isOpen={true}
          onClose={() => {
            setActionType(null);
            setSelectedTransaction(null);
          }}
          onConfirm={handleAction}
          title="Release Escrow Funds"
          message={`Are you sure you want to release ${formatCurrency(selectedTransaction.amount)} to ${selectedTransaction.sellerName}? This action cannot be undone.`}
          confirmText="Release Funds"
          variant="info"
          isLoading={isProcessing}
        />
      )}

      {selectedTransaction && actionType === 'refund' && (
        <ConfirmationModal
          isOpen={true}
          onClose={() => {
            setActionType(null);
            setSelectedTransaction(null);
          }}
          onConfirm={handleAction}
          title="Refund Escrow Funds"
          message={`Are you sure you want to refund ${formatCurrency(selectedTransaction.amount)} to ${selectedTransaction.buyerName}? Please ensure you have documented the reason for this refund.`}
          confirmText="Process Refund"
          variant="danger"
          isLoading={isProcessing}
        />
      )}
    </div>
  );
}
