// app/(moderator)/shipping-evidence/page.tsx
"use client";

import React, { useState } from 'react';
import { Truck, CheckCircle, XCircle, MapPin, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { DataTable, StatusBadge, Modal, ConfirmationModal, Column } from '@/components/admin';
import { mockShippingEvidence } from '@/lib/mockData/evidenceData';
import { ShippingEvidence } from '@/types/admin';
import { formatDate, timeAgo } from '@/lib/utils';

export default function ShippingEvidenceReviewPage() {
  const [selectedEvidence, setSelectedEvidence] = useState<ShippingEvidence | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowApproveModal(false);
    setSelectedEvidence(null);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowRejectModal(false);
    setSelectedEvidence(null);
    setRejectionReason('');
  };

  const columns: Column<ShippingEvidence>[] = [
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
      render: (value) => (
        <span className="text-sm text-gray-900 dark:text-white">{value}</span>
      ),
    },
    {
      key: 'vehicleCondition',
      title: 'VIN / Mileage',
      render: (value) => (
        <div>
          <p className="font-mono text-sm text-gray-900 dark:text-white">{value.vin}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {value.mileage.toLocaleString()} miles
          </p>
        </div>
      ),
    },
    {
      key: 'submittedBy',
      title: 'Submitted By',
      render: (value) => (
        <span className="text-sm text-gray-900 dark:text-white capitalize">{value}</span>
      ),
    },
    {
      key: 'submittedAt',
      title: 'Submitted',
      sortable: true,
      render: (value) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{formatDate(value)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(value)}</p>
        </div>
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
          <FileText className="w-4 h-4" />
          Review
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Shipping Evidence Review
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Review vehicle condition documentation before shipment
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
            {mockShippingEvidence.filter((e) => e.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {mockShippingEvidence.filter((e) => e.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
            {mockShippingEvidence.filter((e) => e.status === 'rejected').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {mockShippingEvidence.length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={mockShippingEvidence}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(evidence) => setSelectedEvidence(evidence)}
        emptyMessage="No shipping evidence found"
        pageSize={10}
        showPagination
      />

      {/* Detail Modal */}
      {selectedEvidence && (
        <Modal
          isOpen={!!selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
          title="Shipping Evidence Review"
          size="xl"
        >
          <div className="space-y-6">
            {/* Header Info */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Auction</p>
                <p className="font-medium text-gray-900 dark:text-white mt-1">
                  {selectedEvidence.auctionTitle}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <div className="mt-1">
                  <StatusBadge status={selectedEvidence.status} />
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Vehicle Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">VIN</p>
                  <p className="font-mono text-gray-900 dark:text-white mt-1">
                    {selectedEvidence.vehicleCondition.vin}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mileage</p>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {selectedEvidence.vehicleCondition.mileage.toLocaleString()} miles
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Condition Notes</p>
                <p className="text-gray-900 dark:text-white mt-1">
                  {selectedEvidence.vehicleCondition.conditionNotes}
                </p>
              </div>
              {selectedEvidence.vehicleCondition.damageDescription && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3">
                  <p className="text-sm font-medium text-yellow-900 dark:text-yellow-300">
                    Damage Reported
                  </p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-400 mt-1">
                    {selectedEvidence.vehicleCondition.damageDescription}
                  </p>
                </div>
              )}
            </div>

            {/* GPS Location */}
            {selectedEvidence.gpsData && (
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                    GPS Location Verified
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-400 mt-1">
                    Lat: {selectedEvidence.gpsData.latitude}, Long: {selectedEvidence.gpsData.longitude}
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-500 mt-1">
                    {formatDate(selectedEvidence.gpsData.timestamp)}
                  </p>
                </div>
              </div>
            )}

            {/* Documents */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Submitted Documents
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* VIN Photo */}
                {selectedEvidence.documents.vinPhoto && (
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      VIN Photo
                    </p>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* Odometer */}
                {selectedEvidence.documents.odometer && (
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Odometer
                    </p>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* Video Walkthrough */}
                {selectedEvidence.documents.videoWalkthrough && (
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Video Walkthrough
                    </p>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                      <Video className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* Exterior Photos */}
                {selectedEvidence.documents.exteriorPhotos.slice(0, 4).map((photo, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Exterior {index + 1}
                    </p>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                ))}

                {/* Interior Photos */}
                {selectedEvidence.documents.interiorPhotos.slice(0, 3).map((photo, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Interior {index + 1}
                    </p>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                ))}

                {/* Damage Photos */}
                {selectedEvidence.documents.damagePhotos?.map((photo, index) => (
                  <div key={index} className="border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-2">
                      Damage {index + 1}
                    </p>
                    <div className="aspect-video bg-red-50 dark:bg-red-900/20 rounded flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-red-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rejection Reason (if rejected) */}
            {selectedEvidence.status === 'rejected' && selectedEvidence.rejectionReason && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm font-medium text-red-900 dark:text-red-300">
                  Rejection Reason
                </p>
                <p className="text-sm text-red-800 dark:text-red-400 mt-1">
                  {selectedEvidence.rejectionReason}
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
                  Approve Evidence
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                  Reject Evidence
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
          title="Approve Shipping Evidence"
          message={`Are you sure you want to approve the shipping evidence for ${selectedEvidence.auctionTitle}? This will allow the transaction to proceed.`}
          confirmText="Approve"
          variant="info"
          isLoading={isProcessing}
        />
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedEvidence && (
        <Modal
          isOpen={showRejectModal}
          onClose={() => {
            setShowRejectModal(false);
            setRejectionReason('');
          }}
          title="Reject Shipping Evidence"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Please provide a detailed reason for rejecting this evidence:
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              placeholder="Explain why this evidence is being rejected and what needs to be corrected..."
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleReject}
                disabled={!rejectionReason.trim() || isProcessing}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Confirm Rejection'}
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
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
