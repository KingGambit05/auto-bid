// app/(admin)/audit-logs/page.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { FileText, Search, User, Calendar, Filter } from 'lucide-react';
import { DataTable, Column } from '@/components/admin';
import { mockAuditLogs } from '@/lib/mockData/fraudData';
import { AuditLog } from '@/types/admin';
import { formatDate } from '@/lib/utils';

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [resourceFilter, setResourceFilter] = useState<string>('all');
  const [actorFilter, setActorFilter] = useState<string>('all');

  // Filter logs
  const filteredLogs = useMemo(() => {
    return mockAuditLogs.filter((log) => {
      const matchesSearch = searchTerm === '' ||
        log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAction = actionFilter === 'all' || log.action === actionFilter;
      const matchesResource = resourceFilter === 'all' || log.resourceType === resourceFilter;
      const matchesActor = actorFilter === 'all' || log.actor === actorFilter;

      return matchesSearch && matchesAction && matchesResource && matchesActor;
    });
  }, [searchTerm, actionFilter, resourceFilter, actorFilter]);

  // Unique values for filters
  const uniqueActions = useMemo(() =>
    Array.from(new Set(mockAuditLogs.map(log => log.action))),
    []
  );

  const uniqueResourceTypes = useMemo(() =>
    Array.from(new Set(mockAuditLogs.map(log => log.resourceType))),
    []
  );

  const uniqueActors = useMemo(() =>
    Array.from(new Set(mockAuditLogs.map(log => ({ id: log.actor, name: log.actorName })))),
    []
  );

  const columns: Column<AuditLog>[] = [
    {
      key: 'timestamp',
      title: 'Timestamp',
      sortable: true,
      render: (value) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{formatDate(value as string)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(value as string).toLocaleTimeString()}
          </p>
        </div>
      ),
    },
    {
      key: 'actorName',
      title: 'Actor',
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{row.actorRole}</p>
        </div>
      ),
    },
    {
      key: 'action',
      title: 'Action',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
          {(value as string).replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'resourceType',
      title: 'Resource Type',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
          {(value as string).replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'resource',
      title: 'Resource ID',
      render: (value) => (
        <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{value}</span>
      ),
    },
    {
      key: 'details',
      title: 'Details',
      render: (value) => {
        const details = value as Record<string, any>;
        const keys = Object.keys(details);
        if (keys.length === 0) return <span className="text-xs text-gray-500 dark:text-gray-400">-</span>;

        const firstKey = keys[0];
        const preview = `${firstKey}: ${JSON.stringify(details[firstKey])}`;

        return (
          <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
            {preview.length > 40 ? preview.substring(0, 40) + '...' : preview}
          </span>
        );
      },
    },
  ];

  // Stats
  const stats = {
    total: mockAuditLogs.length,
    today: mockAuditLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      const today = new Date();
      return logDate.toDateString() === today.toDateString();
    }).length,
    uniqueActors: new Set(mockAuditLogs.map(log => log.actor)).size,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Audit Logs
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Complete history of all administrative actions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.today}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Actors</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.uniqueActors}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by actor, action, or resource..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Filters:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map((action) => (
                <option key={action} value={action}>
                  {action.replace('_', ' ')}
                </option>
              ))}
            </select>

            <select
              value={resourceFilter}
              onChange={(e) => setResourceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            >
              <option value="all">All Resource Types</option>
              {uniqueResourceTypes.map((type) => (
                <option key={type} value={type}>
                  {type.replace('_', ' ')}
                </option>
              ))}
            </select>

            <select
              value={actorFilter}
              onChange={(e) => setActorFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            >
              <option value="all">All Actors</option>
              {uniqueActors.map((actor) => (
                <option key={actor.id} value={actor.id}>
                  {actor.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredLogs}
        columns={columns}
        keyExtractor={(item) => item.id}
        emptyMessage="No audit logs found"
        pageSize={20}
        showPagination
      />

      {/* Export */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Export Audit Logs</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Download filtered logs as CSV for external analysis
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
