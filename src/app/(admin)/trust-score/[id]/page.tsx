// app/(admin)/trust-score/[id]/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { mockUsers } from '@/lib/mockData/userData';
import { formatDate } from '@/lib/utils';

export default function TrustScoreManagementPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const user = mockUsers.find((u) => u.id === userId);

  const [adjustment, setAdjustment] = useState(0);
  const [reason, setReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">User not found</p>
      </div>
    );
  }

  const newScore = Math.max(0, Math.min(100, user.trustScore + adjustment));

  // Mock score history
  const scoreHistory = [
    { date: '2024-01-18T10:00:00Z', score: user.trustScore, change: 0, reason: 'Current score', admin: 'System' },
    { date: '2024-01-15T14:30:00Z', score: user.trustScore + 2, change: +2, reason: 'Successful transaction completed on time', admin: 'System' },
    { date: '2024-01-10T09:00:00Z', score: user.trustScore, change: -3, reason: 'Late payment warning', admin: 'Michael Chen' },
    { date: '2024-01-05T16:00:00Z', score: user.trustScore + 3, change: +5, reason: 'Positive buyer feedback', admin: 'System' },
    { date: '2023-12-28T11:00:00Z', score: user.trustScore - 2, change: -2, reason: 'Minor communication issue reported', admin: 'Sarah Johnson' },
  ];

  const handleAdjustScore = async () => {
    if (!reason.trim() || adjustment === 0) {
      alert('Please provide a reason and adjustment value');
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);

    // Reset form
    setAdjustment(0);
    setReason('');

    alert(`Trust score adjusted successfully! New score: ${newScore}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trust Score Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {user.name} ({user.email})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Score */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Current Trust Score
            </h3>

            <div className="text-center mb-6">
              <div className={`text-6xl font-bold mb-2 ${
                user.trustScore >= 80 ? 'text-green-600 dark:text-green-400' :
                user.trustScore >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                'text-red-600 dark:text-red-400'
              }`}>
                {user.trustScore}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">out of 100</p>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Payment History</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {Math.min(100, user.trustScore + 5)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-600 dark:bg-green-400 h-2 rounded-full"
                  style={{ width: `${Math.min(100, user.trustScore + 5)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Communication</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {Math.min(100, user.trustScore - 5)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                  style={{ width: `${Math.min(100, user.trustScore - 5)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Transaction Success</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {Math.min(100, user.trustScore + 10)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 dark:bg-purple-400 h-2 rounded-full"
                  style={{ width: `${Math.min(100, user.trustScore + 10)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Dispute Record</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {Math.min(100, user.trustScore)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-orange-600 dark:bg-orange-400 h-2 rounded-full"
                  style={{ width: `${Math.min(100, user.trustScore)}%` }}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Warnings</p>
                <p className={`text-lg font-bold ${user.warnings > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                  {user.warnings}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Suspensions</p>
                <p className={`text-lg font-bold ${user.suspensions > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                  {user.suspensions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Adjustment Form & History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Adjustment Form */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Adjust Trust Score
            </h3>

            <div className="space-y-4">
              {/* Adjustment Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adjustment: {adjustment > 0 ? '+' : ''}{adjustment} points
                </label>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  value={adjustment}
                  onChange={(e) => setAdjustment(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>-20</span>
                  <span>0</span>
                  <span>+20</span>
                </div>
              </div>

              {/* Preview */}
              {adjustment !== 0 && (
                <div className={`p-4 rounded-lg ${
                  adjustment > 0
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${
                        adjustment > 0
                          ? 'text-green-900 dark:text-green-300'
                          : 'text-red-900 dark:text-red-300'
                      }`}>
                        New Trust Score Preview
                      </p>
                      <p className={`text-xs mt-1 ${
                        adjustment > 0
                          ? 'text-green-700 dark:text-green-400'
                          : 'text-red-700 dark:text-red-400'
                      }`}>
                        {user.trustScore} → {newScore}
                      </p>
                    </div>
                    {adjustment > 0 ? (
                      <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                </div>
              )}

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Adjustment *
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide a detailed reason for this adjustment..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Quick Reasons */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Reasons
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setAdjustment(-5);
                      setReason('Late payment detected');
                    }}
                    className="px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    Late Payment (-5)
                  </button>
                  <button
                    onClick={() => {
                      setAdjustment(-10);
                      setReason('Poor communication with transaction partner');
                    }}
                    className="px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    Poor Communication (-10)
                  </button>
                  <button
                    onClick={() => {
                      setAdjustment(+5);
                      setReason('Successful transaction with positive feedback');
                    }}
                    className="px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    Positive Feedback (+5)
                  </button>
                  <button
                    onClick={() => {
                      setAdjustment(+10);
                      setReason('Exceptional service and reliability demonstrated');
                    }}
                    className="px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    Exceptional Service (+10)
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={handleAdjustScore}
                  disabled={adjustment === 0 || !reason.trim() || isProcessing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Apply Adjustment'}
                </button>
                <button
                  onClick={() => {
                    setAdjustment(0);
                    setReason('');
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Score History */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Score History
            </h3>

            <div className="space-y-4">
              {scoreHistory.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0 last:pb-0"
                >
                  <div className={`p-2 rounded-lg ${
                    entry.change > 0
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : entry.change < 0
                      ? 'bg-red-100 dark:bg-red-900/30'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    {entry.change > 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : entry.change < 0 ? (
                      <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Score: {entry.score}
                          {entry.change !== 0 && (
                            <span className={`ml-2 ${
                              entry.change > 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              ({entry.change > 0 ? '+' : ''}{entry.change})
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {entry.reason}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(entry.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <span>By: {entry.admin}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
