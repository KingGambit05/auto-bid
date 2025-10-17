// app/(admin)/system/health/page.tsx
"use client";

import React from 'react';
import { Activity, CheckCircle, AlertTriangle, XCircle, Server, Database, Zap, Globe, Mail, Search } from 'lucide-react';
import { mockSystemHealth } from '@/lib/mockData/systemData';
import { formatDate } from '@/lib/utils';

export default function SystemHealthPage() {
  const health = mockSystemHealth;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      case 'degraded':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
      case 'down':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5" />;
      case 'degraded':
        return <AlertTriangle className="w-5 h-5" />;
      case 'down':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getServiceIcon = (serviceName: string) => {
    const name = serviceName.toLowerCase();
    if (name.includes('web') || name.includes('server')) return <Server className="w-5 h-5" />;
    if (name.includes('database')) return <Database className="w-5 h-5" />;
    if (name.includes('payment')) return <Zap className="w-5 h-5" />;
    if (name.includes('cdn') || name.includes('image')) return <Globe className="w-5 h-5" />;
    if (name.includes('email') || name.includes('mail')) return <Mail className="w-5 h-5" />;
    if (name.includes('search')) return <Search className="w-5 h-5" />;
    return <Activity className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          System Health Monitor
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Real-time system performance and service status
        </p>
      </div>

      {/* Overall Health */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Overall System Status
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All core services are operational
            </p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor('healthy')}`}>
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Operational</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Uptime</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{health.uptime}%</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Response Time</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{health.responseTime}ms</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Error Rate</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{health.errorRate}%</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Users</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{health.activeUsers.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Resource Usage
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{health.cpuUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${health.cpuUsage > 80 ? 'bg-red-600' : health.cpuUsage > 60 ? 'bg-yellow-600' : 'bg-green-600'}`}
                  style={{ width: `${health.cpuUsage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{health.memoryUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${health.memoryUsage > 80 ? 'bg-red-600' : health.memoryUsage > 60 ? 'bg-yellow-600' : 'bg-green-600'}`}
                  style={{ width: `${health.memoryUsage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Disk Usage</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{health.diskUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${health.diskUsage > 80 ? 'bg-red-600' : health.diskUsage > 60 ? 'bg-yellow-600' : 'bg-green-600'}`}
                  style={{ width: `${health.diskUsage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Database Connections</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{health.databaseConnections}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Cache Hit Rate</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">{health.cacheHitRate}%</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">API Latency</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">P50</span>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">{health.apiLatency.p50}ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">P95</span>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">{health.apiLatency.p95}ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">P99</span>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">{health.apiLatency.p99}ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Status */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Services Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {health.services.map((service) => (
            <div
              key={service.name}
              className={`border rounded-lg p-4 ${getStatusColor(service.status)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getServiceIcon(service.name)}
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-xs mt-1">Uptime: {service.uptime}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(service.status)}
                  <span className="text-sm font-medium capitalize">{service.status}</span>
                </div>
              </div>
              {service.issue && (
                <p className="text-xs mt-2 pt-2 border-t border-current border-opacity-20">
                  {service.issue}
                </p>
              )}
              <p className="text-xs mt-2 opacity-75">
                Last checked: {formatDate(service.lastCheck)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Incidents
        </h3>
        <div className="space-y-4">
          {health.recentIncidents.map((incident) => (
            <div
              key={incident.id}
              className={`border rounded-lg p-4 ${
                incident.status === 'resolved'
                  ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  : incident.severity === 'high'
                  ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                  : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{incident.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Started: {formatDate(incident.startedAt)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                    incident.status === 'resolved'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                  }`}>
                    {incident.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                    incident.severity === 'high'
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400'
                      : incident.severity === 'medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                  }`}>
                    {incident.severity}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Duration: {incident.duration}</span>
                {incident.resolvedAt && (
                  <>
                    <span>•</span>
                    <span>Resolved: {formatDate(incident.resolvedAt)}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
