// src/components/pages/MyBids.tsx
'use client';

import React, { useState } from 'react';
import { mockUserBids } from '@/data/mockData';
import { UserBid } from '@/types/auction';
import Image from "next/image";

const MyBids: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusColor = (status: UserBid['status']) => {
    switch (status) {
      case 'winning': return 'bg-green-100 text-green-800';
      case 'outbid': return 'bg-red-100 text-red-800';
      case 'won': return 'bg-blue-100 text-blue-800';
      case 'lost': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBids = statusFilter === 'all' 
    ? mockUserBids 
    : mockUserBids.filter(bid => bid.status === statusFilter);

  const handleViewAuction = (bidId: number) => {
    console.log('Viewing auction for bid:', bidId);
    // Navigate to auction detail
  };

  const handleBidAgain = (bidId: number) => {
    console.log('Bidding again on:', bidId);
    // Navigate to auction and open bid form
  };

  const handlePayNow = (bidId: number) => {
    console.log('Processing payment for:', bidId);
    // Navigate to payment page
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Bids</h2>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="winning">Winning</option>
          <option value="outbid">Outbid</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {filteredBids.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-400 text-2xl">🔨</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bids found</h3>
          <p className="text-gray-500 mb-4">
            {statusFilter === 'all' 
              ? "You haven't placed any bids yet." 
              : `No bids with status: ${statusFilter}`
            }
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
            Browse Auctions
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  My Bid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Bid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Left
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBids.map(bid => (
                <tr key={bid.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Image
                        src={bid.image}
                        alt={bid.carTitle}
                        width={1000}
                        height={1000}
                        className="w-14 h-10 bg-gray-300 rounded-lg object-cover flex-shrink-0 mr-1"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bid.carTitle}</div>
                        <div className="text-sm text-gray-500">
                          Auction ends: {new Date(bid.auctionEnd).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${bid.myBid.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {bid.status === 'winning' && 'Your highest bid'}
                      {bid.status === 'outbid' && 'Outbid'}
                      {bid.status === 'won' && 'Winning bid'}
                      {bid.status === 'lost' && 'Final bid'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${bid.currentBid.toLocaleString()}
                    </div>
                    {bid.currentBid > bid.myBid && (
                      <div className="text-sm text-red-600">
                        +${(bid.currentBid - bid.myBid).toLocaleString()} higher
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bid.status)}`}>
                      {bid.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      bid.timeLeft === 'Ended' 
                        ? 'text-gray-500' 
                        : bid.timeLeft.includes('h') && !bid.timeLeft.includes('d')
                        ? 'text-red-600' 
                        : 'text-gray-900'
                    }`}>
                      {bid.timeLeft}
                    </div>
                    {bid.timeLeft !== 'Ended' && (
                      <div className="text-xs text-gray-500">
                        {bid.timeLeft.includes('h') && !bid.timeLeft.includes('d') ? 'Ending soon!' : 'Active'}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleViewAuction(bid.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    {bid.status === 'outbid' && bid.timeLeft !== 'Ended' && (
                      <button 
                        onClick={() => handleBidAgain(bid.id)}
                        className="text-blue-600 hover:text-blue-900 ml-3"
                      >
                        Bid Again
                      </button>
                    )}
                    {bid.status === 'won' && (
                      <button 
                        onClick={() => handlePayNow(bid.id)}
                        className="text-green-600 hover:text-green-900 ml-3"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Stats */}
      {filteredBids.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">
              {mockUserBids.filter(bid => bid.status === 'winning').length}
            </div>
            <div className="text-sm text-gray-600">Currently Winning</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-red-600">
              {mockUserBids.filter(bid => bid.status === 'outbid').length}
            </div>
            <div className="text-sm text-gray-600">Outbid</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {mockUserBids.filter(bid => bid.status === 'won').length}
            </div>
            <div className="text-sm text-gray-600">Won</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-600">
              {mockUserBids.length}
            </div>
            <div className="text-sm text-gray-600">Total Bids</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBids;