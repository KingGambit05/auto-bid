// app/(moderator)/delivery-evidence/page.tsx
"use client";

import React, { useState } from 'react';
import { Package, CheckCircle, XCircle, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { DataTable, StatusBadge, Modal, ConfirmationModal, Column } from '@/components/admin';
import { mockDeliveryEvidence } from '@/lib/mockData/evidenceData';
import { DeliveryEvidence } from '@/types/admin';
import { formatDate, timeAgo } from '@/lib/utils';

export default function DeliveryEvidenceReviewPage() {
  const [selectedEvidence, setSelectedEvidence] = useState<DeliveryEvidence | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowApproveModal(false);
    setSelectedEvidence(null);
  };

  const handleReject = async () => {
    if (!notes.trim()) {
      alert('Please provide notes for rejection');
      return;
    }
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowRejectModal(false);
    setSelectedEvidence(null);
    setNotes('');
  };

  const columns: Column<DeliveryEvidence>[] = [
    {
      key: 'id',
      title: 'Evidence ID',
      render: (value) => (
        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{value}</span>
      ),
    },
    {
      key: 'auctionTitle',
      title: 'Auction',
      sortable: true,
    },
    {
      key: 'sellerEvidence',
      title: 'Seller Submitted',
      render: (value) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{formatDate(value.submittedAt)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(value.submittedAt)}</p>
        </div>
      ),
    },
    {
      key: 'buyerEvidence',
      title: 'Buyer Submitted',
      render: (value) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{formatDate(value.submittedAt)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(value.submittedAt)}</p>
        </div>
      ),
    },
    {
      key: 'buyerEvidence',
      title: 'Issues Reported',
      render: (value) => (
        value.issuesReported ? (
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-sm font-medium text-red-600 dark:text-red-400">Yes</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">No</span>
          </div>
        )
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'id',
      title: 'Actions',
      render: (value, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedEvidence(row);
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <Package className="w-4 h-4" />
          Review
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Delivery Evidence Review
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Compare seller and buyer delivery evidence
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
            {mockDeliveryEvidence.filter((e) => e.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">With Issues</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
            {mockDeliveryEvidence.filter((e) => e.buyerEvidence.issuesReported).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {mockDeliveryEvidence.filter((e) => e.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {mockDeliveryEvidence.length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={mockDeliveryEvidence}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(evidence) => setSelectedEvidence(evidence)}
        emptyMessage="No delivery evidence found"
        pageSize={10}
        showPagination
      />

      {/* Detail Modal */}
      {selectedEvidence && (
        <Modal
          isOpen={!!selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
          title="Delivery Evidence Comparison"
          size="xl"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedEvidence.auctionTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Transaction ID: {selectedEvidence.transactionId}
                </p>
              </div>
              <StatusBadge status={selectedEvidence.status} size="lg" />
            </div>

            {/* Issues Alert */}
            {selectedEvidence.buyerEvidence.issuesReported && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900 dark:text-red-300">
                      Issues Reported by Buyer
                    </p>
                    {selectedEvidence.buyerEvidence.issues && (
                      <ul className="text-sm text-red-800 dark:text-red-400 mt-2 space-y-1 list-disc list-inside">
                        {selectedEvidence.buyerEvidence.issues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seller Evidence */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-green-900 dark:text-green-300 mb-3">
                  Seller Evidence
                </h4>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-green-700 dark:text-green-400">Submitted</p>
                    <p className="text-sm text-green-900 dark:text-green-200 mt-1">
                      {formatDate(selectedEvidence.sellerEvidence.submittedAt)}
                    </p>
                  </div>

                  {selectedEvidence.sellerEvidence.location && (
                    <div>
                      <p className="text-xs text-green-700 dark:text-green-400">Location</p>
                      <p className="text-sm text-green-900 dark:text-green-200 mt-1">
                        {selectedEvidence.sellerEvidence.location}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-green-700 dark:text-green-400">Notes</p>
                    <p className="text-sm text-green-900 dark:text-green-200 mt-1">
                      {selectedEvidence.sellerEvidence.notes}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-green-700 dark:text-green-400 mb-2">
                      Photos ({selectedEvidence.sellerEvidence.photos.length})
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedEvidence.sellerEvidence.photos.slice(0, 4).map((photo, index) => (
                        <div key={index} className="aspect-video bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedEvidence.sellerEvidence.signature && (
                    <div>
                      <p className="text-xs text-green-700 dark:text-green-400 mb-2">Signature</p>
                      <div className="h-20 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center">
                        <p className="text-sm text-green-600 dark:text-green-400">Signature Present</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Buyer Evidence */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3">
                  Buyer Evidence
                </h4>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-blue-700 dark:text-blue-400">Submitted</p>
                    <p className="text-sm text-blue-900 dark:text-blue-200 mt-1">
                      {formatDate(selectedEvidence.buyerEvidence.submittedAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-blue-700 dark:text-blue-400">Notes</p>
                    <p className="text-sm text-blue-900 dark:text-blue-200 mt-1">
                      {selectedEvidence.buyerEvidence.notes}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-blue-700 dark:text-blue-400">Condition Report</p>
                    <p className="text-sm text-blue-900 dark:text-blue-200 mt-1">
                      {selectedEvidence.buyerEvidence.conditionReport}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mb-2">
                      Photos ({selectedEvidence.buyerEvidence.photos.length})
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedEvidence.buyerEvidence.photos.slice(0, 4).map((photo, index) => (
                        <div key={index} className="aspect-video bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedEvidence.buyerEvidence.signature && (
                    <div>
                      <p className="text-xs text-blue-700 dark:text-blue-400 mb-2">Signature</p>
                      <div className="h-20 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                        <p className="text-sm text-blue-600 dark:text-blue-400">Signature Present</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comparison Notes */}
            {selectedEvidence.comparisonNotes && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Comparison Notes
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedEvidence.comparisonNotes}
                </p>
              </div>
            )}

            {/* Actions */}
            {selectedEvidence.status === 'pending' && (
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => setShowApproveModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve Delivery
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                  Escalate to Dispute
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Approve Confirmation */}
      {showApproveModal && selectedEvidence && (
        <ConfirmationModal
          isOpen={showApproveModal}
          onClose={() => setShowApproveModal(false)}
          onConfirm={handleApprove}
          title="Approve Delivery"
          message={`Are you sure you want to approve the delivery for ${selectedEvidence.auctionTitle}? This will complete the transaction and release payment to the seller.`}
          confirmText="Approve & Release Payment"
          variant="info"
          isLoading={isProcessing}
        />
      )}

      {/* Reject/Escalate Modal */}
      {showRejectModal && selectedEvidence && (
        <Modal
          isOpen={showRejectModal}
          onClose={() => {
            setShowRejectModal(false);
            setNotes('');
          }}
          title="Escalate to Dispute"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              This delivery evidence shows discrepancies. Provide notes for the dispute case:
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Document the discrepancies and issues that need admin review..."
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleReject}
                disabled={!notes.trim() || isProcessing}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Create Dispute Case'}
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setNotes('');
                }}
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
