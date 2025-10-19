/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(moderator)/kyc/queue/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileCheck, Search, Filter, Eye } from 'lucide-react';
import { DataTable, StatusBadge, FilterPanel, Column, FilterConfig } from '@/components/admin';
import { mockKYCApplications } from '@/lib/mockData/transactionData';
import { KYCApplication } from '@/types/admin';
import { formatDate, timeAgo } from '@/lib/utils';

export default function KYCReviewQueuePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(mockKYCApplications);

  // Filter configuration
  const filterConfig: FilterConfig[] = [
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Needs Review', value: 'needs_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      id: 'submittedDate',
      label: 'Submitted Date',
      type: 'daterange',
    },
    {
      id: 'idType',
      label: 'ID Type',
      type: 'multiselect',
      options: [
        { label: 'Driver\'s License', value: 'drivers_license' },
        { label: 'Passport', value: 'passport' },
        { label: 'National ID', value: 'national_id' },
      ],
    },
  ];

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredData(mockKYCApplications);
      return;
    }

    const filtered = mockKYCApplications.filter(
      (app) =>
        app.userName.toLowerCase().includes(query.toLowerCase()) ||
        app.userEmail.toLowerCase().includes(query.toLowerCase()) ||
        app.id.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle filters
  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = [...mockKYCApplications];

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter((app) => app.status === filters.status);
    }

    // Apply ID type filter
    if (filters.idType && filters.idType.length > 0) {
      filtered = filtered.filter((app) =>
        filters.idType.includes(app.personalInfo.idType)
      );
    }

    // Apply date range filter
    if (filters.submittedDate?.from) {
      filtered = filtered.filter(
        (app) => new Date(app.submittedAt) >= new Date(filters.submittedDate.from)
      );
    }
    if (filters.submittedDate?.to) {
      filtered = filtered.filter(
        (app) => new Date(app.submittedAt) <= new Date(filters.submittedDate.to)
      );
    }

    setFilteredData(filtered);
  };

  // Table columns
  const columns: Column<KYCApplication>[] = [
    {
      key: 'id',
      title: 'Application ID',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
          {value}
        </span>
      ),
    },
    {
      key: 'userName',
      title: 'Name',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.userEmail}</p>
        </div>
      ),
    },
    {
      key: 'personalInfo',
      title: 'ID Type',
      render: (value) => (
        <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
          {value.idType.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'submittedAt',
      title: 'Submitted',
      sortable: true,
      render: (value) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">
            {formatDate(value)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {timeAgo(value)}
          </p>
        </div>
      ),
    },
    {
      key: 'verificationChecks',
      title: 'Verification',
      render: (value) => {
        const passed = Object.values(value).filter(Boolean).length;
        const total = Object.values(value).length;
        const percentage = (passed / total) * 100;

        return (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  percentage === 100
                    ? 'bg-green-500'
                    : percentage >= 75
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {passed}/{total}
            </span>
          </div>
        );
      },
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
            router.push(`/moderator/kyc/review/${value}`);
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          Review
        </button>
      ),
      width: '120px',
    },
  ];

  const pendingCount = mockKYCApplications.filter((app) => app.status === 'pending' || app.status === 'needs_review').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            KYC Review Queue
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {pendingCount} application{pendingCount !== 1 ? 's' : ''} awaiting review
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-sm font-medium rounded-lg">
            {pendingCount} Pending
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <FilterPanel
            filters={filterConfig}
            onFilterChange={handleFilterChange}
            onClearAll={() => setFilteredData(mockKYCApplications)}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {mockKYCApplications.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
            {mockKYCApplications.filter((app) => app.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {mockKYCApplications.filter((app) => app.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
            {mockKYCApplications.filter((app) => app.status === 'rejected').length}
          </p>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <DataTable
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item.id}
          onRowClick={(row) => router.push(`/moderator/kyc/review/${row.id}`)}
          emptyMessage="No KYC applications found"
          pageSize={10}
          showPagination
        />
      </div>
    </div>
  );
}
