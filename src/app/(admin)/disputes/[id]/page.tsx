// app/(admin)/disputes/[id]/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Video,
  MessageSquare,
  DollarSign,
} from 'lucide-react';
import { StatusBadge, ConfirmationModal, Modal } from '@/components/admin';
import { mockDisputeCases } from '@/lib/mockData/disputeData';
import { formatDate, timeAgo, formatCurrency } from '@/lib/utils';

interface PageProps {
  params: { id: string };
}

export default function DisputeCaseReviewPage({ params }: PageProps) {
  const router = useRouter();
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [decision, setDecision] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const disputeCase = mockDisputeCases.find((d) => d.id === params.id);

  if (!disputeCase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Scale className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Case Not Found
        </h2>
        <button
          onClick={() => router.push('/admin/disputes')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Disputes
        </button>
      </div>
    );
  }

  const handleResolve = async () => {
    if (!decision.trim()) {
      alert('Please provide a decision');
      return;
    }
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowResolveModal(false);
    router.push('/admin/disputes');
  };

  const handleEscalate = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowEscalateModal(false);
    router.push('/admin/disputes/senior');
  };

  const isResolved = disputeCase.status === 'resolved';
  const isEscalated = disputeCase.status === 'escalated';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/disputes')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dispute Case Review
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Case #{disputeCase.caseNumber}
            </p>
          </div>
        </div>
        <StatusBadge status={disputeCase.status} size="lg" />
      </div>

      {/* Case Overview */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Auction</p>
            <p className="font-medium text-gray-900 dark:text-white mt-1">
              {disputeCase.auctionTitle}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              ID: {disputeCase.auctionId}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
            <p className="font-medium text-gray-900 dark:text-white mt-1 capitalize">
              {disputeCase.category.replace('_', ' ')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Priority</p>
            <div className="mt-1">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                  disputeCase.priority === 'urgent'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                    : disputeCase.priority === 'high'
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400'
                    : disputeCase.priority === 'medium'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400'
                }`}
              >
                {disputeCase.priority}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Parties */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3">
            Initiator (Complainant)
          </h3>
          <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
            {disputeCase.initiatorName}
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
            User ID: {disputeCase.initiatedBy}
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-6">
          <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-300 mb-3">
            Respondent
          </h3>
          <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
            {disputeCase.respondentName}
          </p>
          <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
            User ID: {disputeCase.respondent}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Case Description
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {disputeCase.description}
        </p>
      </div>

      {/* Evidence */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Submitted Evidence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Documents */}
          {disputeCase.evidence.documents.length > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Documents</p>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {disputeCase.evidence.documents.length}
              </p>
            </div>
          )}

          {/* Photos */}
          {disputeCase.evidence.photos.length > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Photos</p>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {disputeCase.evidence.photos.length}
              </p>
            </div>
          )}

          {/* Videos */}
          {disputeCase.evidence.videos.length > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Videos</p>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {disputeCase.evidence.videos.length}
              </p>
            </div>
          )}

          {/* Messages */}
          {disputeCase.evidence.messages.length > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Messages</p>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {disputeCase.evidence.messages.length}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Case Timeline
        </h2>

        <div className="space-y-4">
          {disputeCase.timeline.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${
                  event.type === 'created' ? 'bg-blue-500' :
                  event.type === 'resolved' ? 'bg-green-500' :
                  event.type === 'escalated' ? 'bg-red-500' :
                  'bg-gray-400'
                }`} />
                {index < disputeCase.timeline.length - 1 && (
                  <div className="w-0.5 h-full min-h-[40px] bg-gray-200 dark:bg-gray-700" />
                )}
              </div>

              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {event.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      By {event.actorName} • {formatDate(event.timestamp)}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {timeAgo(event.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resolution (if resolved) */}
      {isResolved && disputeCase.resolution && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">
                Case Resolved
              </h3>
              <p className="text-sm text-green-800 dark:text-green-400 mb-3">
                {disputeCase.resolution.decision}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-green-700 dark:text-green-500">Action Taken</p>
                  <p className="text-green-900 dark:text-green-200 font-medium mt-1">
                    {disputeCase.resolution.action}
                  </p>
                </div>
                {disputeCase.resolution.refundAmount && (
                  <div>
                    <p className="text-green-700 dark:text-green-500">Refund Amount</p>
                    <p className="text-green-900 dark:text-green-200 font-medium mt-1">
                      {formatCurrency(disputeCase.resolution.refundAmount)}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-green-700 dark:text-green-500">Resolved By</p>
                  <p className="text-green-900 dark:text-green-200 font-medium mt-1">
                    {disputeCase.resolution.resolvedBy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!isResolved && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowResolveModal(true)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            <CheckCircle className="w-5 h-5" />
            Resolve Case
          </button>
          {!isEscalated && (
            <button
              onClick={() => setShowEscalateModal(true)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              <TrendingUp className="w-5 h-5" />
              Escalate to Senior Panel
            </button>
          )}
        </div>
      )}

      {/* Resolve Modal */}
      {showResolveModal && (
        <Modal
          isOpen={showResolveModal}
          onClose={() => setShowResolveModal(false)}
          title="Resolve Dispute Case"
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Decision & Resolution
              </label>
              <textarea
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                rows={4}
                placeholder="Explain the decision and resolution..."
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Refund Amount (Optional)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={handleResolve}
                disabled={!decision.trim() || isProcessing}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Confirm Resolution'}
              </button>
              <button
                onClick={() => setShowResolveModal(false)}
                disabled={isProcessing}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Escalate Confirmation */}
      {showEscalateModal && (
        <ConfirmationModal
          isOpen={showEscalateModal}
          onClose={() => setShowEscalateModal(false)}
          onConfirm={handleEscalate}
          title="Escalate to Senior Panel"
          message={`This case will be sent to the senior dispute panel for review. The case requires higher-level decision making authority. Continue?`}
          confirmText="Escalate Case"
          variant="warning"
          isLoading={isProcessing}
        />
      )}
    </div>
  );
}
