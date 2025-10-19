// app/(admin)/payments/page.tsx
"use client";

import React, { useState } from 'react';
import { Receipt, Download, Filter } from 'lucide-react';
import { DataTable, StatusBadge, FilterPanel, Column, FilterConfig } from '@/components/admin';
import { mockPaymentLogs } from '@/lib/mockData/transactionData';
import { PaymentLog } from '@/types/admin';
import { formatCurrency, formatDate, timeAgo } from '@/lib/utils';

export default function PaymentLogsPage() {
  const [filteredData, setFilteredData] = useState(mockPaymentLogs);

  const filterConfig: FilterConfig[] = [
    {
      id: 'type',
      label: 'Transaction Type',
      type: 'select',
      options: [
        { label: 'Payment', value: 'payment' },
        { label: 'Refund', value: 'refund' },
        { label: 'Payout', value: 'payout' },
        { label: 'Fee', value: 'fee' },
      ],
    },
    {
      id: 'status',
      label: 'Status',
      type: 'multiselect',
      options: [
        { label: 'Completed', value: 'completed' },
        { label: 'Processing', value: 'processing' },
        { label: 'Pending', value: 'pending' },
        { label: 'Failed', value: 'failed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    {
      id: 'method',
      label: 'Payment Method',
      type: 'select',
      options: [
        { label: 'Card', value: 'card' },
        { label: 'Bank Transfer', value: 'bank_transfer' },
        { label: 'Wallet', value: 'wallet' },
        { label: 'Escrow', value: 'escrow' },
      ],
    },
    {
      id: 'dateRange',
      label: 'Date Range',
      type: 'daterange',
    },
  ];

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = [...mockPaymentLogs];

    if (filters.type) {
      filtered = filtered.filter((log) => log.type === filters.type);
    }

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((log) => filters.status.includes(log.status));
    }

    if (filters.method) {
      filtered = filtered.filter((log) => log.method === filters.method);
    }

    if (filters.dateRange?.from) {
      filtered = filtered.filter(
        (log) => new Date(log.timestamp) >= new Date(filters.dateRange.from)
      );
    }
    if (filters.dateRange?.to) {
      filtered = filtered.filter(
        (log) => new Date(log.timestamp) <= new Date(filters.dateRange.to)
      );
    }

    setFilteredData(filtered);
  };

  const columns: Column<PaymentLog>[] = [
    {
      key: 'id',
      title: 'Payment ID',
      render: (value) => (
        <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{value}</span>
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
      key: 'buyerName',
      title: 'From',
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Buyer</p>
        </div>
      ),
    },
    {
      key: 'sellerName',
      title: 'To',
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Seller</p>
        </div>
      ),
    },
    {
      key: 'type',
      title: 'Type',
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
            value === 'payment'
              ? 'bg-blue-100 dark:bg-blue-900/30 text-green-800 dark:text-blue-400'
              : value === 'refund'
              ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
              : value === 'payout'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400'
          }`}
        >
          {value}
        </span>
      ),
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
      key: 'fees',
      title: 'Fees',
      render: (value) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      key: 'netAmount',
      title: 'Net Amount',
      render: (value) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      key: 'method',
      title: 'Method',
      render: (value) => (
        <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
          {value.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => <StatusBadge status={value} size="sm" />,
    },
    {
      key: 'timestamp',
      title: 'Date',
      sortable: true,
      render: (value) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{formatDate(value)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(value)}</p>
        </div>
      ),
    },
  ];

  // Calculate stats
  const totalRevenue = mockPaymentLogs
    .filter((log) => log.type === 'payment' && log.status === 'completed')
    .reduce((sum, log) => sum + log.fees, 0);
  const totalVolume = mockPaymentLogs
    .filter((log) => log.status === 'completed')
    .reduce((sum, log) => sum + log.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment Logs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Complete transaction history and financial records
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {mockPaymentLogs.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Transaction Volume</p>
          <p className="text-2xl font-bold text-green-600 dark:text-blue-400 mt-1">
            {formatCurrency(totalVolume)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Platform Revenue</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Failed Payments</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
            {mockPaymentLogs.filter((log) => log.status === 'failed').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <FilterPanel
          filters={filterConfig}
          onFilterChange={handleFilterChange}
          onClearAll={() => setFilteredData(mockPaymentLogs)}
        />
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredData}
        columns={columns}
        keyExtractor={(item) => item.id}
        emptyMessage="No payment logs found"
        pageSize={15}
        showPagination
      />
    </div>
  );
}
