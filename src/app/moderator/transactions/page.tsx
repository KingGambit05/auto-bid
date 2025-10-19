// app/(moderator)/transactions/page.tsx
"use client";

import React, { useState } from 'react';
import { Handshake, CheckCircle, XCircle, Eye, DollarSign } from 'lucide-react';
import { DataTable, StatusBadge, Modal, Column } from '@/components/admin';
import { mockTransactionReviews } from '@/lib/mockData/transactionData';
import { TransactionReview } from '@/types/admin';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function TransactionReviewPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionReview | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowApproveModal(false);
    setSelectedTransaction(null);
  };

  const columns: Column<TransactionReview>[] = [
    {
      key: 'id',
      title: 'Transaction ID',
      render: (value) => (
        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{value}</span>
      ),
    },
    {
      key: 'auctionTitle',
      title: 'Auction',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">ID: {row.auctionId}</p>
        </div>
      ),
    },
    {
      key: 'buyerName',
      title: 'Buyer',
      sortable: true,
    },
    {
      key: 'sellerName',
      title: 'Seller',
      sortable: true,
    },
    {
      key: 'amount',
      title: 'Amount',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      key: 'agreedTerms',
      title: 'Pickup Date',
      render: (value) => formatDate(value.pickupDate),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (value, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTransaction(row);
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-600 dark:text-blue-400 hover:bg-green-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          Review
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Transaction Review
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Review and approve buyer-seller transaction agreements
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
            {mockTransactionReviews.filter((t) => t.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {mockTransactionReviews.filter((t) => t.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-bold text-green-600 dark:text-blue-400 mt-1">
            {mockTransactionReviews.filter((t) => t.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={mockTransactionReviews}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(row) => setSelectedTransaction(row)}
        emptyMessage="No transactions found"
        pageSize={10}
        showPagination
      />

      {/* Detail Modal */}
      {selectedTransaction && (
        <Modal
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          title="Transaction Details"
          size="lg"
        >
          <div className="space-y-6">
            {/* Header Info */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Auction</p>
                <p className="font-medium text-gray-900 dark:text-white mt-1">
                  {selectedTransaction.auctionTitle}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(selectedTransaction.amount)}
                </p>
              </div>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Buyer</p>
                <p className="text-lg font-semibold text-blue-900 dark:text-blue-100 mt-1">
                  {selectedTransaction.buyerName}
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-medium text-green-900 dark:text-green-300">Seller</p>
                <p className="text-lg font-semibold text-green-900 dark:text-green-100 mt-1">
                  {selectedTransaction.sellerName}
                </p>
              </div>
            </div>

            {/* Agreed Terms */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Agreed Terms
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Purchase Price</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(selectedTransaction.agreedTerms.price)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Pickup Date</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(selectedTransaction.agreedTerms.pickupDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Pickup Location</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedTransaction.agreedTerms.pickupLocation}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Payment Method</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedTransaction.agreedTerms.paymentMethod}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Shipping Method</span>
                  <span className="font-semibold text-gray-900 dark:text-white capitalize">
                    {selectedTransaction.agreedTerms.shippingMethod}
                  </span>
                </div>
                {selectedTransaction.agreedTerms.additionalNotes && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Additional Notes</p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedTransaction.agreedTerms.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            {selectedTransaction.status === 'pending' && (
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => setShowApproveModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve Transaction
                </button>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Approve Confirmation Modal */}
      {showApproveModal && selectedTransaction && (
        <Modal
          isOpen={showApproveModal}
          onClose={() => setShowApproveModal(false)}
          title="Approve Transaction"
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Are you sure you want to approve this transaction for{' '}
              <strong>{formatCurrency(selectedTransaction.amount)}</strong>?
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              This will allow the parties to proceed with the agreed terms.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleApprove}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Confirm Approval'}
              </button>
              <button
                onClick={() => setShowApproveModal(false)}
                disabled={isProcessing}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
