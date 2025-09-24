// src/components/layout/Navigation.tsx
'use client';

import React, { useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

type PageType = 'browse' | 'auction-detail' | 'sell' | 'my-bids' | 'my-listings' | 'dashboard';

interface NavigationProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AutoBID</h1>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => onPageChange('browse')}
                className={`px-3 py-2 text-sm font-medium ${
                  currentPage === 'browse' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Browse Auctions
              </button>
              <button
                onClick={() => onPageChange('sell')}
                className={`px-3 py-2 text-sm font-medium ${
                  currentPage === 'sell' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Sell Your Car
              </button>
              <button
                onClick={() => onPageChange('my-bids')}
                className={`px-3 py-2 text-sm font-medium ${
                  currentPage === 'my-bids' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                My Bids
              </button>
              <button
                onClick={() => onPageChange('my-listings')}
                className={`px-3 py-2 text-sm font-medium ${
                  currentPage === 'my-listings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                My Listings
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">John Doe</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;