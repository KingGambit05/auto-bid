// src/components/layout/Navigation.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type PageType = 'browse' | 'auction-detail' | 'sell' | 'my-bids' | 'my-listings' | 'dashboard' | 'manage-listing' | 'listing-analytics';

interface NavigationProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  // Search is not used in the prototype navbar; keep minimal state
  // Removed unused search state to satisfy linter
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const { user, logout, isAuthenticated } = useAuth();

  // Close dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when page changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error (maybe show a toast)
    } finally {
      setIsLoggingOut(false);
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  // Profile/settings/help handlers removed (not used in prototype)

  const handleNavigation = (page: PageType) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  if (!isAuthenticated) {
    return null; // Don't render navigation if not authenticated
  }

  const navigationItems = [
    { key: 'browse', label: 'Browse Auctions' },
    { key: 'sell', label: 'Sell Your Car' },
    { key: 'my-bids', label: 'My Bids' },
    { key: 'my-listings', label: 'My Listings' },
    { key: 'dashboard', label: 'Dashboard' },
  ] as const;

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">AutoBID</h1>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex space-x-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => onPageChange(item.key as PageType)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      currentPage === item.key 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
              </div>
            </div>
            
            {/* Right side items */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search - Hidden on mobile, shown on tablet+ */}
              {/* <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64"
                />
              </div> */}
              
              {/* Notifications */}
              {/* <button onClick={toggle} className="w-full flex items-center px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
              </button> */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
                  3
                </span>
              </button>
              {/* Desktop User Dropdown */}
              <div className="relative hidden sm:block" ref={dropdownRef}>
                {/* Theme toggle (desktop) */}
                
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[120px]">{user?.email}</p>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {/* Desktop Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                          {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{user?.firstName} {user?.lastName}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    {/* <div className="py-2">
                      
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User size={16} className="mr-3" />
                        View Profile
                      </button>
                      
                      <button
                        onClick={handleSettingsClick}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings size={16} className="mr-3" />
                        Account Settings
                      </button>
                      
                      <button
                        onClick={handleHelpClick}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <HelpCircle size={16} className="mr-3" />
                        Help & Support
                      </button>
                    </div> */}

                    {/* Logout Section */}
                    <div className="border-t border-gray-200 py-2">
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoggingOut ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-3"></div>
                            Logging out...
                          </>
                        ) : (
                          <>
                            <LogOut size={16} className="mr-3" />
                            Logout
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Mobile Search */}
          {/* <div className="relative mb-4 sm:hidden">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div> */}

          {/* Mobile User Info - only show on mobile */}
          <div className="sm:hidden bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation Items */}
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.key as PageType)}
                className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                  currentPage === item.key
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile User Actions - only show on mobile */}
          <div className="sm:hidden border-t border-gray-200 mt-6 pt-6 space-y-1">
            {/* <button
              onClick={handleProfileClick}
              className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User size={16} className="mr-3" />
              View Profile
            </button>
            
            <button
              onClick={handleSettingsClick}
              className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings size={16} className="mr-3" />
              Account Settings
            </button>
            
            <button
              onClick={handleHelpClick}
              className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HelpCircle size={16} className="mr-3" />
              Help & Support
            </button> */}
            
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-3"></div>
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut size={16} className="mr-3" />
                  Logout
                </>
              )}
            </button>
            {/* <button onClick={toggle} className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              {isDark ? <Sun size={16} className="mr-3 text-yellow-400" /> : <Moon size={16} className="mr-3" />}
              Toggle Theme
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;