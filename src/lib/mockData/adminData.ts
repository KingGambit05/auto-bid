// lib/mockData/adminData.ts
import {
  ModeratorDashboardStats,
  AdminDashboardStats,
} from '@/types/admin';

export const mockModeratorDashboardStats: ModeratorDashboardStats = {
  pendingTasks: {
    kyc: 12,
    tickets: 5,
    reports: 3,
    evidence: 7,
  },
  todayStats: {
    reviewedKYC: 8,
    resolvedTickets: 12,
    moderatedContent: 5,
  },
  recentActivity: [
    {
      type: 'KYC Approved',
      description: 'Approved KYC application for John Smith',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      type: 'Ticket Resolved',
      description: 'Resolved support ticket #4521 - Payment issue',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      type: 'Content Removed',
      description: 'Removed listing for inappropriate content',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      type: 'Evidence Approved',
      description: 'Approved shipping evidence for transaction #7823',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      type: 'Case Escalated',
      description: 'Escalated dispute case #DS-001 to admin',
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    },
  ],
};

export const mockAdminDashboardStats: AdminDashboardStats = {
  pendingTasks: {
    kyc: 12,
    tickets: 5,
    reports: 3,
    evidence: 7,
  },
  todayStats: {
    reviewedKYC: 8,
    resolvedTickets: 12,
    moderatedContent: 5,
  },
  recentActivity: [
    {
      type: 'System Alert',
      description: 'High transaction volume detected - monitoring',
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
    {
      type: 'User Suspended',
      description: 'Suspended user account for fraud attempt',
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
    {
      type: 'Dispute Resolved',
      description: 'Resolved dispute case #DS-001 - Refund issued',
      timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    },
    {
      type: 'Payment Released',
      description: 'Released escrow payment for transaction #7890',
      timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    },
    {
      type: 'Feature Updated',
      description: 'Enabled new bidding algorithm feature flag',
      timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    },
  ],
  systemHealth: {
    uptime: 99.8,
    responseTime: 145,
    errorRate: 0.02,
    activeUsers: 1247,
  },
  financials: {
    revenue: 45780,
    escrowHeld: 125000,
    pendingPayouts: 38500,
  },
  alerts: {
    critical: 0,
    warnings: 2,
    info: 5,
  },
};

// Chart data for admin dashboard
export const mockRevenueChartData = [
  { date: '2024-01-01', amount: 12500 },
  { date: '2024-01-02', amount: 15200 },
  { date: '2024-01-03', amount: 13800 },
  { date: '2024-01-04', amount: 18900 },
  { date: '2024-01-05', amount: 21200 },
  { date: '2024-01-06', amount: 19500 },
  { date: '2024-01-07', amount: 22800 },
];

export const mockUserGrowthData = [
  { date: '2024-01-01', count: 1850 },
  { date: '2024-01-02', count: 1892 },
  { date: '2024-01-03', count: 1935 },
  { date: '2024-01-04', count: 1978 },
  { date: '2024-01-05', count: 2024 },
  { date: '2024-01-06', count: 2089 },
  { date: '2024-01-07', count: 2156 },
];

export const mockAuctionActivityData = [
  { date: '2024-01-01', count: 45 },
  { date: '2024-01-02', count: 52 },
  { date: '2024-01-03', count: 48 },
  { date: '2024-01-04', count: 63 },
  { date: '2024-01-05', count: 71 },
  { date: '2024-01-06', count: 58 },
  { date: '2024-01-07', count: 67 },
];
