// src/components/pages/MyListings.tsx
'use client';
import Image from "next/image";
import React, { useState } from 'react';
import { Plus, Eye, Settings, BarChart3, AlertCircle, CheckCircle, Filter } from 'lucide-react';
import { mockUserListings } from '@/data/mockData';
import { UserListing } from '@/types/auction';

interface MyListingsProps {
  onCreateNew: () => void;
  onViewListing?: (listingId: number) => void;
  onManageListing?: (listingId: number) => void;
  onViewAnalytics?: (listingId: number) => void;
}

const MyListings: React.FC<MyListingsProps> = ({ onCreateNew, onViewListing, onManageListing, onViewAnalytics }) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const getListingStatusColor = (status: UserListing['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'reserve-not-met': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-blue-100 text-green-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: UserListing['status']) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-green-600" />;
      case 'reserve-not-met': return <AlertCircle size={16} className="text-yellow-600" />;
      case 'sold': return <CheckCircle size={16} className="text-green-600" />;
      case 'ended': return <AlertCircle size={16} className="text-gray-600" />;
      default: return null;
    }
  };

  const filteredListings = statusFilter === 'all' 
    ? mockUserListings 
    : mockUserListings.filter(listing => listing.status === statusFilter);

  const handleViewListing = (listingId: number) => {
    if (onViewListing) return onViewListing(listingId);
    console.log('Viewing listing (no handler):', listingId);
  };

  const handleManageListing = (listingId: number) => {
    if (onManageListing) return onManageListing(listingId);
    console.log('Managing listing (no handler):', listingId);
  };

  const handleViewAnalytics = (listingId: number) => {
    if (onViewAnalytics) return onViewAnalytics(listingId);
    console.log('Viewing analytics for listing (no handler):', listingId);
  };

  const getPerformanceIndicator = (listing: UserListing) => {
    const reserveMet = listing.currentBid >= listing.reservePrice;
    const highInterest = listing.watchers > 20;
    const manyBids = listing.bids > 10;

    if (reserveMet && highInterest) {
      return { text: 'Performing well', color: 'text-green-600' };
    } else if (highInterest || manyBids) {
      return { text: 'Good interest', color: 'text-green-600' };
    } else if (listing.views < 50) {
      return { text: 'Low visibility', color: 'text-red-600' };
    } else {
      return { text: 'Moderate interest', color: 'text-yellow-600' };
    }
  };

  const formatStatusDisplay = (status: string) => {
    return status.replace('-', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Listings</h2>
        
        {/* Desktop Controls */}
        <div className="hidden sm:flex space-x-3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="reserve-not-met">Reserve Not Met</option>
            <option value="sold">Sold</option>
            <option value="ended">Ended</option>
          </select>
          <button 
            onClick={onCreateNew}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium transition-colors"
          >
            <Plus size={16} className="inline mr-2" />
            List New Car
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex sm:hidden space-x-2">
          <button 
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium transition-colors"
          >
            <Filter size={16} className="inline mr-2" />
            Filter
          </button>
          <button 
            onClick={onCreateNew}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium transition-colors"
          >
            <Plus size={16} className="inline mr-2" />
            List Car
          </button>
        </div>
      </div>

      {/* Mobile Filter Dropdown */}
      {showMobileFilter && (
        <div className="sm:hidden mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
          <select 
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setShowMobileFilter(false);
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="reserve-not-met">Reserve Not Met</option>
            <option value="sold">Sold</option>
            <option value="ended">Ended</option>
          </select>
        </div>
      )}

      {/* Empty State */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Plus className="text-gray-400 w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
            {statusFilter === 'all' ? 'No listings yet' : `No ${formatStatusDisplay(statusFilter).toLowerCase()} listings`}
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mb-4 px-4">
            {statusFilter === 'all' 
              ? "Start selling your car by creating your first auction." 
              : `No listings found with status: ${formatStatusDisplay(statusFilter)}`
            }
          </p>
          <button 
            onClick={onCreateNew}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium transition-colors"
          >
            List Your First Car
          </button>
        </div>
      ) : (
        <>
          {/* Listings Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {filteredListings.map(listing => (
              <div key={listing.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex min-w-0 flex-1">
                      <Image
                        src={listing.image}
                        alt={listing.title}
                        width={1000}
                        height={1000}
                        className="w-12 h-9 sm:w-14 sm:h-10 bg-gray-300 rounded-lg object-cover flex-shrink-0 mr-3"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base truncate">{listing.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Listed on {listing.created}</p>
                        <div className="flex items-center mt-1">
                          {getStatusIcon(listing.status)}
                          <span className={`ml-1 text-xs font-medium ${getPerformanceIndicator(listing).color} truncate`}>
                            {getPerformanceIndicator(listing).text}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ml-2 ${getListingStatusColor(listing.status)}`}>
                      {formatStatusDisplay(listing.status).toUpperCase()}
                    </span>
                  </div>

                  {/* Bid Information */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Current Bid</p>
                      <p className="text-base sm:text-lg font-semibold text-green-600">${listing.currentBid.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">
                        Started at ${listing.startingBid.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Reserve Price</p>
                      <p className="text-base sm:text-lg font-semibold">${listing.reservePrice.toLocaleString()}</p>
                      <p className={`text-xs ${
                        listing.currentBid >= listing.reservePrice ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {listing.currentBid >= listing.reservePrice ? 'Reserve met' : 'Reserve not met'}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-base sm:text-lg font-semibold text-gray-900">{listing.bids}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Bids</p>
                    </div>
                    <div className="text-center">
                      <p className="text-base sm:text-lg font-semibold text-gray-900">{listing.views}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-base sm:text-lg font-semibold text-gray-900">{listing.watchers}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Watching</p>
                    </div>
                  </div>

                  {/* Time Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
                      <span>Time Remaining</span>
                      <span className={`font-medium ${
                        listing.timeLeft === 'Ended' 
                          ? 'text-gray-500' 
                          : listing.timeLeft.includes('h') && !listing.timeLeft.includes('d')
                          ? 'text-red-600' 
                          : 'text-gray-900'
                      }`}>
                        {listing.timeLeft}
                      </span>
                    </div>
                    {listing.status === 'active' && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            listing.timeLeft.includes('h') && !listing.timeLeft.includes('d')
                              ? 'bg-red-500' 
                              : 'bg-green-500'
                          }`}
                          style={{ 
                            width: listing.timeLeft.includes('d') 
                              ? '75%' 
                              : listing.timeLeft.includes('h') 
                              ? '25%' 
                              : '90%' 
                          }}
                        ></div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {/* Mobile: Stack buttons on very small screens */}
                    <div className="flex flex-col sm:flex-row w-full space-y-2 sm:space-y-0 sm:space-x-2">
                      <button 
                        onClick={() => handleViewListing(listing.id)}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 text-xs sm:text-sm font-medium transition-colors"
                      >
                        <Eye size={14} className="inline mr-1 sm:mr-2" />
                        View
                      </button>
                      <button 
                        onClick={() => handleManageListing(listing.id)}
                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-xs sm:text-sm font-medium transition-colors"
                      >
                        <Settings size={14} className="inline mr-1 sm:mr-2" />
                        Manage
                      </button>
                      <button 
                        onClick={() => handleViewAnalytics(listing.id)}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 text-xs sm:text-sm font-medium transition-colors"
                      >
                        <BarChart3 size={14} className="inline mr-1 sm:mr-2" />
                        Analytics
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Summary */}
          <div className="mt-6 sm:mt-8 bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {mockUserListings.filter(l => l.status === 'active').length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Active Listings</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {mockUserListings.reduce((sum, l) => sum + l.views, 0).toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Total Views</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">
                  {mockUserListings.reduce((sum, l) => sum + l.watchers, 0)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Total Watchers</div>
              </div>
              <div className="text-center sm:text-left col-span-2 md:col-span-1">
                <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                  ${mockUserListings.reduce((sum, l) => sum + l.currentBid, 0).toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Total Bid Value</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyListings;