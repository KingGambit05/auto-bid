// components/auth/ProtectedRoute.tsx
"use client";

import React, { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserRole } from '@/types/auth';
import { hasPermission, PERMISSIONS } from '@/utils/rbac';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  requiredPermission?: keyof typeof PERMISSIONS;
  requireVerification?: boolean;
  fallback?: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requiredPermission,
  requireVerification = false,
  fallback,
  redirectTo = '/login'
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Check role-based access
    if (!isLoading && isAuthenticated && user) {
      // If allowedRoles is specified, check if user's role is in the list
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect based on user's role
        if (user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (user.role === 'moderator') {
          router.push('/moderator/dashboard');
        } else {
          router.push('/main');
        }
        return;
      }

      // If requiredPermission is specified, check if user has the permission
      if (requiredPermission && !hasPermission(user.role, requiredPermission)) {
        // Redirect to appropriate dashboard
        if (user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (user.role === 'moderator') {
          router.push('/moderator/dashboard');
        } else {
          router.push('/main');
        }
      }
    }
  }, [isAuthenticated, isLoading, router, redirectTo, allowedRoles, requiredPermission, user]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return fallback || null;
  }

  // Check role requirements
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  // Check permission requirements
  if (requiredPermission && !hasPermission(user.role, requiredPermission)) {
    return null;
  }

  // Check verification requirements
  if (requireVerification && user && !user.isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Required</h2>
          <p className="text-gray-600 mb-4">
            Please verify your account to access this feature.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/profile/verification')}
              className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Complete Verification
            </button>
            <button
              onClick={() => router.back()}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;