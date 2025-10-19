// app/admin/fees/page.tsx
"use client";

import React, { useState } from 'react';
import { DollarSign, Receipt, TrendingUp, Save } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function FeeManagementPage() {
  const [listingFee, setListingFee] = useState('400');
  const [transactionFeeRate, setTransactionFeeRate] = useState('4');
  const [bidDepositRate, setBidDepositRate] = useState('10');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('Fee configuration saved successfully!');
  };

  const estimatedRevenue = {
    daily: 45000,
    monthly: 1350000,
    yearly: 16200000,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Fee Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure platform fees and view revenue analytics
        </p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Daily Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(estimatedRevenue.daily)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Receipt className="w-5 h-5 text-green-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(estimatedRevenue.monthly)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Yearly Projection</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(estimatedRevenue.yearly)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Configuration */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Fee Configuration
        </h2>

        <div className="space-y-6">
          {/* Listing Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Listing Fee (₱)
            </label>
            <input
              type="number"
              min="300"
              max="500"
              value={listingFee}
              onChange={(e) => setListingFee(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Range: ₱300 - ₱500 per listing
            </p>
          </div>

          {/* Transaction Fee Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Transaction Fee Rate (%)
            </label>
            <input
              type="number"
              min="3"
              max="5"
              step="0.1"
              value={transactionFeeRate}
              onChange={(e) => setTransactionFeeRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Range: 3% - 5% of transaction value
            </p>
          </div>

          {/* Bid Deposit Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bid Deposit Rate (%)
            </label>
            <input
              type="number"
              min="5"
              max="15"
              step="1"
              value={bidDepositRate}
              onChange={(e) => setBidDepositRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Range: 5% - 15% of bid amount
            </p>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
