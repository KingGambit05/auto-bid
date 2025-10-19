// hooks/useRBAC.ts - Role-Based Access Control hook

import { useAuth } from './useAuth';
import {
  hasPermission,
  isAdmin,
  isModerator,
  isRegularUser,
  getDefaultDashboard,
  getRoleDisplayName,
  getRoleColor,
  PERMISSIONS
} from '@/utils/rbac';

/**
 * Custom hook for role-based access control
 */
export function useRBAC() {
  const { user } = useAuth();
  const role = user?.role;

  return {
    // Role checks
    isAdmin: isAdmin(role),
    isModerator: isModerator(role),
    isRegularUser: isRegularUser(role),

    // Permission checker
    hasPermission: (permission: keyof typeof PERMISSIONS) =>
      hasPermission(role, permission),

    // Utility functions
    getDefaultDashboard: () => role ? getDefaultDashboard(role) : '/landing',
    getRoleDisplayName: () => role ? getRoleDisplayName(role) : 'Guest',
    getRoleColor: () => role ? getRoleColor(role) : 'gray',

    // Current role
    role,
  };
}
