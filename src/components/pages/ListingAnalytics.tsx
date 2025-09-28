// src/components/pages/ListingAnalytics.tsx
'use client';
import React from 'react';
import { ArrowLeft, BarChart3, TrendingUp } from 'lucide-react';
import { mockUserListings } from '@/data/mockData';
import { UserListing } from '@/types/auction';

interface ListingAnalyticsProps {
  listingId: number;
  onBack: () => void;
}

const ListingAnalytics: React.FC<ListingAnalyticsProps> = ({ listingId, onBack }) => {
  const listing: UserListing | undefined = mockUserListings.find(l => l.id === listingId);

  if (!listing) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <button onClick={onBack} className="text-blue-600 mb-4 inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" /> Back
        </button>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600">Analytics not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button onClick={onBack} className="text-blue-600 mb-4 inline-flex items-center">
        <ArrowLeft size={16} className="mr-2" /> Back
      </button>

      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Listing Analytics</h2>
          <div className="text-sm text-gray-500">{listing.title}</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-500">Views</div>
              <BarChart3 size={18} className="text-gray-500" />
            </div>
            <div className="text-2xl font-bold">{listing.views}</div>
            <div className="text-xs text-gray-500">Total views since listing</div>
          </div>

          <div className="p-4 bg-gray-50 rounded">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-500">Watchers</div>
              <TrendingUp size={18} className="text-gray-500" />
            </div>
            <div className="text-2xl font-bold">{listing.watchers}</div>
            <div className="text-xs text-gray-500">Users watching this auction</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded border border-gray-100">
          <h4 className="text-sm font-semibold mb-2">Quick Insights</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Bid activity: {listing.bids} bids</li>
            <li>Reserve status: {listing.currentBid >= listing.reservePrice ? 'Reserve met' : 'Reserve not met'}</li>
            <li>Approx. engagement: {listing.views > 200 ? 'High' : listing.views > 75 ? 'Moderate' : 'Low'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListingAnalytics;
