// app/(moderator)/kyc/review/[id]/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  FileText,
  User,
  MapPin,
  Calendar,
  AlertTriangle,
  Image as ImageIcon,
} from 'lucide-react';
import { StatusBadge, ConfirmationModal } from '@/components/admin';
import { mockKYCApplications } from '@/lib/mockData/transactionData';
import { formatDate } from '@/lib/utils';

interface PageProps {
  params: { id: string };
}

export default function KYCReviewPanelPage({ params }: PageProps) {
  const router = useRouter();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Find application by ID
  const application = mockKYCApplications.find((app) => app.id === params.id);

  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <AlertTriangle className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Application Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The KYC application you're looking for doesn't exist.
        </p>
        <button
          onClick={() => router.push('/moderator/kyc/queue')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Queue
        </button>
      </div>
    );
  }

  const handleApprove = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowApproveModal(false);
    router.push('/moderator/kyc/queue');
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowRejectModal(false);
    router.push('/moderator/kyc/queue');
  };

  const isReviewed = application.status === 'approved' || application.status === 'rejected';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/moderator/kyc/queue')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              KYC Application Review
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Application ID: {application.id}
            </p>
          </div>
        </div>

        <StatusBadge status={application.status} size="lg" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Personal Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Applicant Info */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Applicant Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Full Name
                </label>
                <p className="text-gray-900 dark:text-white mt-1">
                  {application.personalInfo.fullName}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="text-gray-900 dark:text-white mt-1">
                  {application.userEmail}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Date of Birth
                </label>
                <p className="text-gray-900 dark:text-white mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {formatDate(application.personalInfo.dateOfBirth)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Address
                </label>
                <p className="text-gray-900 dark:text-white mt-1 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    {application.personalInfo.address}<br />
                    {application.personalInfo.city}, {application.personalInfo.state}{' '}
                    {application.personalInfo.zipCode}<br />
                    {application.personalInfo.country}
                  </span>
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  ID Type
                </label>
                <p className="text-gray-900 dark:text-white mt-1 capitalize">
                  {application.personalInfo.idType.replace('_', ' ')}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  ID Number
                </label>
                <p className="text-gray-900 dark:text-white mt-1 font-mono">
                  {application.personalInfo.idNumber}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Submitted
                </label>
                <p className="text-gray-900 dark:text-white mt-1">
                  {formatDate(application.submittedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Verification Checks */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Verification Checks
            </h2>

            <div className="space-y-3">
              {Object.entries(application.verificationChecks).map(([key, passed]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  {passed ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section (if reviewed) */}
          {isReviewed && application.notes && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 p-6">
              <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-400 mb-2">
                Review Notes
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                {application.notes}
              </p>
            </div>
          )}
        </div>

        {/* Right: Documents Viewer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Document Review
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ID Front */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  ID Front
                </h3>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Document Preview</p>
                    <p className="text-xs text-gray-400 mt-1">{application.documents.idFront}</p>
                  </div>
                </div>
              </div>

              {/* ID Back */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  ID Back
                </h3>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Document Preview</p>
                    <p className="text-xs text-gray-400 mt-1">{application.documents.idBack}</p>
                  </div>
                </div>
              </div>

              {/* Selfie */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Selfie Verification
                </h3>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Photo Preview</p>
                    <p className="text-xs text-gray-400 mt-1">{application.documents.selfie}</p>
                  </div>
                </div>
              </div>

              {/* Proof of Address (if available) */}
              {application.documents.proofOfAddress && (
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Proof of Address
                  </h3>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Document Preview</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {application.documents.proofOfAddress}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Review Notes Input (if not reviewed) */}
          {!isReviewed && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Review Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
                placeholder="Add any notes about this review..."
              />
            </div>
          )}

          {/* Action Buttons */}
          {!isReviewed && (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowApproveModal(true)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                Approve Application
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Reject Application
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Approve Modal */}
      <ConfirmationModal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={handleApprove}
        title="Approve KYC Application"
        message={`Are you sure you want to approve the KYC application for ${application.userName}? This will grant them full platform access.`}
        confirmText="Approve"
        variant="info"
        isLoading={isProcessing}
      />

      {/* Reject Modal */}
      <ConfirmationModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleReject}
        title="Reject KYC Application"
        message={`Please provide a reason for rejecting ${application.userName}'s application:`}
        confirmText="Reject"
        variant="danger"
        isLoading={isProcessing}
      >
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm mt-4 focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="Explain why this application is being rejected..."
        />
      </ConfirmationModal>
    </div>
  );
}
