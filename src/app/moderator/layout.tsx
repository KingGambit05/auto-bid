// app/(moderator)/layout.tsx
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAuth } from '@/hooks/useAuth';

export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    // Check if user has moderator or admin role
    if (!isLoading && isAuthenticated && user) {
      if (user.role !== 'moderator' && user.role !== 'admin') {
        // Redirect regular users to landing page
        router.push('/landing');
      }
    }
  }, [user, isAuthenticated, isLoading, router]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
