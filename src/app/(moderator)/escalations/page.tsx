// app/(moderator)/escalations/page.tsx
"use client";

import React, { useState } from 'react';
import { AlertTriangle, Send, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EscalationFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: '',
    priority: 'medium',
    subject: '',
    description: '',
    relatedId: '',
    attachments: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form and redirect after showing success
    setTimeout(() => {
      setShowSuccess(false);
      router.push('/moderator/dashboard');
    }, 2000);
  };

  const isFormValid = formData.category && formData.subject && formData.description;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Escalate to Admin
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Send complex cases or issues to the admin team for review
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <p className="text-green-900 dark:text-green-300 font-medium">
            Case escalated successfully! Redirecting...
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 space-y-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Issue Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
            required
          >
            <option value="">Select a category</option>
            <option value="kyc">KYC / Identity Verification</option>
            <option value="transaction">Transaction Dispute</option>
            <option value="payment">Payment Issue</option>
            <option value="fraud">Suspected Fraud</option>
            <option value="policy">Policy Violation</option>
            <option value="technical">Technical Issue</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Priority Level <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-4 gap-3">
            {(['low', 'medium', 'high', 'urgent'] as const).map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => setFormData({ ...formData, priority })}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors capitalize ${
                  formData.priority === priority
                    ? priority === 'urgent'
                      ? 'bg-red-600 text-white border-red-600'
                      : priority === 'high'
                      ? 'bg-orange-600 text-white border-orange-600'
                      : priority === 'medium'
                      ? 'bg-yellow-600 text-white border-yellow-600'
                      : 'bg-gray-600 text-white border-gray-600'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        {/* Related ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Related ID (Optional)
          </label>
          <input
            type="text"
            value={formData.relatedId}
            onChange={(e) => setFormData({ ...formData, relatedId: e.target.value })}
            placeholder="e.g., user-123, txn-456, kyc-789"
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            User ID, Transaction ID, KYC Application ID, etc.
          </p>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Brief summary of the issue"
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={8}
            placeholder="Provide a detailed explanation of the issue, why it needs admin attention, and any actions you've already taken..."
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Minimum 50 characters
          </p>
        </div>

        {/* Alert Box */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-300">
                Escalation Guidelines
              </p>
              <ul className="text-sm text-yellow-800 dark:text-yellow-400 mt-2 space-y-1 list-disc list-inside">
                <li>Only escalate cases you cannot resolve with moderator privileges</li>
                <li>Provide all relevant information and context</li>
                <li>The admin team will review and respond within 24 hours</li>
                <li>You'll be notified once the case is resolved</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? 'Escalating...' : 'Escalate to Admin'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
