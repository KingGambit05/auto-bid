// app/admin/settings/page.tsx
"use client";

import React, { useState } from 'react';
import { Settings, Clock, Shield, Zap, Save } from 'lucide-react';

export default function SystemSettingsPage() {
  const [auctionDuration, setAuctionDuration] = useState('7');
  const [paymentWindow, setPaymentWindow] = useState('48');
  const [shippingWindow, setShippingWindow] = useState('7');
  const [deliveryWindow, setDeliveryWindow] = useState('14');
  const [guestMode, setGuestMode] = useState(true);
  const [autoBid, setAutoBid] = useState(true);
  const [autoExtend, setAutoExtend] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          System Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure platform-wide settings and features
        </p>
      </div>

      {/* Auction Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-green-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Auction Configuration
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Auction Duration (days)
            </label>
            <input
              type="number"
              min="3"
              max="30"
              value={auctionDuration}
              onChange={(e) => setAuctionDuration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Range: 3-30 days
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Timeframes */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transaction Timeframes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Payment Window (hours)
            </label>
            <input
              type="number"
              min="24"
              max="168"
              value={paymentWindow}
              onChange={(e) => setPaymentWindow(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              24-168 hours
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Shipping Window (days)
            </label>
            <input
              type="number"
              min="3"
              max="14"
              value={shippingWindow}
              onChange={(e) => setShippingWindow(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              3-14 days
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Delivery Window (days)
            </label>
            <input
              type="number"
              min="7"
              max="30"
              value={deliveryWindow}
              onChange={(e) => setDeliveryWindow(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              7-30 days
            </p>
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Feature Toggles
          </h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Guest Browsing</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Allow non-registered users to browse listings</p>
            </div>
            <input
              type="checkbox"
              checked={guestMode}
              onChange={(e) => setGuestMode(e.target.checked)}
              className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Auto-Bid System</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Enable automatic bidding functionality</p>
            </div>
            <input
              type="checkbox"
              checked={autoBid}
              onChange={(e) => setAutoBid(e.target.checked)}
              className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Auto-Extend Auctions</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Automatically extend auctions with last-minute bids</p>
            </div>
            <input
              type="checkbox"
              checked={autoExtend}
              onChange={(e) => setAutoExtend(e.target.checked)}
              className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg cursor-pointer">
            <div>
              <p className="text-sm font-medium text-red-900 dark:text-red-300">Maintenance Mode</p>
              <p className="text-xs text-red-700 dark:text-red-400">Disable all user access to the platform</p>
            </div>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
            />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-5 h-5" />
          {isSaving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>
    </div>
  );
}
