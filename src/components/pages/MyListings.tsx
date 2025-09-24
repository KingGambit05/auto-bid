// src/components/pages/MyListings.tsx
'use client';
import Image from "next/image";
import React, { useState } from 'react';
import { Plus, Eye, Settings, BarChart3, AlertCircle, CheckCircle } from 'lucide-react';
import { mockUserListings } from '@/data/mockData';
import { UserListing } from '@/types/auction';

interface MyListingsProps {
  onCreateNew: () => void;
}

const MyListings: React.FC<MyListingsProps> = ({ onCreateNew }) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getListingStatusColor = (status: UserListing['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'reserve-not-met': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: UserListing['status']) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-green-600" />;
      case 'reserve-not-met': return <AlertCircle size={16} className="text-yellow-600" />;
      case 'sold': return <CheckCircle size={16} className="text-blue-600" />;
      case 'ended': return <AlertCircle size={16} className="text-gray-600" />;
      default: return null;
    }
  };

  const filteredListings = statusFilter === 'all' 
    ? mockUserListings 
    : mockUserListings.filter(listing => listing.status === statusFilter);

  const handleViewListing = (listingId: number) => {
    console.log('Viewing listing:', listingId);
    // Navigate to auction detail view
  };

  const handleManageListing = (listingId: number) => {
    console.log('Managing listing:', listingId);
    // Navigate to listing management page
  };

  const handleViewAnalytics = (listingId: number) => {
    console.log('Viewing analytics for listing:', listingId);
    // Navigate to analytics page
  };

  const getPerformanceIndicator = (listing: UserListing) => {
    const reserveMet = listing.currentBid >= listing.reservePrice;
    const highInterest = listing.watchers > 20;
    const manyBids = listing.bids > 10;

    if (reserveMet && highInterest) {
      return { text: 'Performing well', color: 'text-green-600' };
    } else if (highInterest || manyBids) {
      return { text: 'Good interest', color: 'text-blue-600' };
    } else if (listing.views < 50) {
      return { text: 'Low visibility', color: 'text-red-600' };
    } else {
      return { text: 'Moderate interest', color: 'text-yellow-600' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
        <div className="flex space-x-3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="reserve-not-met">Reserve Not Met</option>
            <option value="sold">Sold</option>
            <option value="ended">Ended</option>
          </select>
          <button 
            onClick={onCreateNew}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            <Plus size={16} className="inline mr-2" />
            List New Car
          </button>
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Plus size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {statusFilter === 'all' ? 'No listings yet' : `No ${statusFilter} listings`}
          </h3>
          <p className="text-gray-500 mb-4">
            {statusFilter === 'all' 
              ? "Start selling your car by creating your first auction." 
              : `No listings found with status: ${statusFilter}`
            }
          </p>
          <button 
            onClick={onCreateNew}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            List Your First Car
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredListings.map(listing => (
            <div key={listing.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex">
                    <Image
                        src={listing.image}
                        alt={listing.title}
                        width={1000}
                        height={1000}
                        className="w-14 h-10 bg-gray-300 rounded-lg object-cover flex-shrink-0 mr-1"
                      />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{listing.title}</h4>
                      <p className="text-sm text-gray-600">Listed on {listing.created}</p>
                      <div className="flex items-center mt-1">
                        {getStatusIcon(listing.status)}
                        <span className={`ml-1 text-xs font-medium ${getPerformanceIndicator(listing).color}`}>
                          {getPerformanceIndicator(listing).text}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getListingStatusColor(listing.status)}`}>
                    {listing.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Bid</p>
                    <p className="text-lg font-semibold text-green-600">${listing.currentBid.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">
                      Started at ${listing.startingBid.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reserve Price</p>
                    <p className="text-lg font-semibold">${listing.reservePrice.toLocaleString()}</p>
                    <p className={`text-xs ${
                      listing.currentBid >= listing.reservePrice ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {listing.currentBid >= listing.reservePrice ? 'Reserve met' : 'Reserve not met'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{listing.bids}</p>
                    <p className="text-sm text-gray-600">Bids</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{listing.views}</p>
                    <p className="text-sm text-gray-600">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{listing.watchers}</p>
                    <p className="text-sm text-gray-600">Watching</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
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
                        className={`h-2 rounded-full ${
                          listing.timeLeft.includes('h') && !listing.timeLeft.includes('d')
                            ? 'bg-red-500' 
                            : 'bg-blue-500'
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

                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewListing(listing.id)}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 text-sm font-medium"
                  >
                    <Eye size={16} className="inline mr-2" />
                    View
                  </button>
                  <button 
                    onClick={() => handleManageListing(listing.id)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
                  >
                    <Settings size={16} className="inline mr-2" />
                    Manage
                  </button>
                  <button 
                    onClick={() => handleViewAnalytics(listing.id)}
                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    <BarChart3 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Performance Summary */}
      {filteredListings.length > 0 && (
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {mockUserListings.filter(l => l.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Listings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {mockUserListings.reduce((sum, l) => sum + l.views, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {mockUserListings.reduce((sum, l) => sum + l.watchers, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Watchers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                ${mockUserListings.reduce((sum, l) => sum + l.currentBid, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Bid Value</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;