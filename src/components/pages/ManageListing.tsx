// src/components/pages/ManageListing.tsx
'use client';
import React from 'react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { mockUserListings } from '@/data/mockData';
import { UserListing } from '@/types/auction';

interface ManageListingProps {
  listingId: number;
  onBack: () => void;
}

const ManageListing: React.FC<ManageListingProps> = ({ listingId, onBack }) => {
  const listing: UserListing | undefined = mockUserListings.find(l => l.id === listingId);

  if (!listing) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <button onClick={onBack} className="text-blue-600 mb-4 inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" /> Back
        </button>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600">Listing not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button onClick={onBack} className="text-blue-600 mb-4 inline-flex items-center">
        <ArrowLeft size={16} className="mr-2" /> Back
      </button>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Manage Listing</h2>
              <p className="text-sm text-gray-600">{listing.title}</p>
            </div>
            <div className="text-right">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{listing.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="text-xs text-gray-500">Current Bid</div>
              <div className="text-lg font-bold text-green-600">${listing.currentBid.toLocaleString()}</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-500">Reserve</div>
              <div className="text-lg font-bold">${listing.reservePrice.toLocaleString()}</div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center">
              <Edit size={16} className="mr-2" /> Edit Listing
            </button>
            <button className="w-full border border-red-300 text-red-600 py-2 rounded-md flex items-center justify-center bg-white">
              <Trash2 size={16} className="mr-2" /> Remove Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageListing;
