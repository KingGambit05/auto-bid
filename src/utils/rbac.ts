// utils/rbac.ts - Role-Based Access Control utilities

import { UserRole } from '@/types/auth';

/**
 * Permission levels for different roles
 */
export const PERMISSIONS: Record<string, readonly UserRole[]> = {
  // User permissions
  VIEW_AUCTIONS: ['buyer', 'seller', 'both', 'moderator', 'admin'],
  CREATE_BID: ['buyer', 'both', 'moderator', 'admin'],
  CREATE_LISTING: ['seller', 'both', 'moderator', 'admin'],
  MANAGE_OWN_LISTINGS: ['seller', 'both', 'moderator', 'admin'],
  MANAGE_OWN_BIDS: ['buyer', 'both', 'moderator', 'admin'],
  VIEW_OWN_WALLET: ['buyer', 'seller', 'both', 'moderator', 'admin'],

  // Moderator permissions
  VIEW_ALL_USERS: ['moderator', 'admin'],
  VIEW_REPORTS: ['moderator', 'admin'],
  MANAGE_DISPUTES: ['moderator', 'admin'],
  REVIEW_KYC: ['moderator', 'admin'],
  HANDLE_TICKETS: ['moderator', 'admin'],
  VIEW_ESCALATIONS: ['moderator', 'admin'],
  MANAGE_TRANSACTIONS: ['moderator', 'admin'],
  VIEW_DELIVERY_EVIDENCE: ['moderator', 'admin'],
  MANAGE_SHIPPING_EVIDENCE: ['moderator', 'admin'],

  // Admin-only permissions
  MANAGE_ALL_LISTINGS: ['admin'],
  MANAGE_ALL_USERS: ['admin'],
  VIEW_AUDIT_LOGS: ['admin'],
  MANAGE_SYSTEM_SETTINGS: ['admin'],
  MANAGE_FEATURES: ['admin'],
  VIEW_FRAUD_DETECTION: ['admin'],
  MANAGE_PAYMENTS: ['admin'],
  MANAGE_ESCROW: ['admin'],
  MANAGE_TRUST_SCORES: ['admin'],
  VIEW_ANALYTICS: ['admin'],
  MANAGE_ROLES: ['admin'],
} as const;

/**
 * Check if a user role has a specific permission
 */
export function hasPermission(
  userRole: UserRole | undefined | null,
  permission: keyof typeof PERMISSIONS
): boolean {
  if (!userRole) return false;
  return PERMISSIONS[permission].includes(userRole);
}

/**
 * Check if a user role is at least moderator level
 */
export function isModerator(role: UserRole | undefined | null): boolean {
  if (!role) return false;
  return role === 'moderator' || role === 'admin';
}

/**
 * Check if a user role is admin
 */
export function isAdmin(role: UserRole | undefined | null): boolean {
  if (!role) return false;
  return role === 'admin';
}

/**
 * Check if a user role is a regular user (buyer, seller, or both)
 */
export function isRegularUser(role: UserRole | undefined | null): boolean {
  if (!role) return false;
  return role === 'buyer' || role === 'seller' || role === 'both';
}

/**
 * Get the default dashboard path for a role
 */
export function getDefaultDashboard(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'moderator':
      return '/moderator/dashboard';
    case 'buyer':
    case 'seller':
    case 'both':
    default:
      return '/main';
  }
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'Administrator';
    case 'moderator':
      return 'Moderator';
    case 'buyer':
      return 'Buyer';
    case 'seller':
      return 'Seller';
    case 'both':
      return 'Buyer & Seller';
    default:
      return 'User';
  }
}

/**
 * Get role color for UI display
 */
export function getRoleColor(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'red';
    case 'moderator':
      return 'blue';
    case 'seller':
      return 'green';
    case 'buyer':
      return 'purple';
    case 'both':
      return 'indigo';
    default:
      return 'gray';
  }
}
