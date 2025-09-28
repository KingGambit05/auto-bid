// src/components/pages/AuctionDetail.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, Heart, CheckCircle, Star } from 'lucide-react';
import { Auction } from '@/types/auction';

interface AuctionDetailProps {
  auction: Auction | null;
  onBack: () => void;
}

const AuctionDetail: React.FC<AuctionDetailProps> = ({ auction, onBack }) => {
  const [bidAmount, setBidAmount] = useState<string>('');

  if (!auction) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500">Auction not found</p>
          <button onClick={onBack} className="mt-4 text-blue-600 hover:text-blue-800">
            Back to Auctions
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceBid = () => {
    console.log('Placing bid:', bidAmount);
    // Handle bid submission
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6"
      >
        <ChevronLeft size={20} />
        <span>Back to Auctions</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="bg-white rounded-lg border border-gray-200 mb-4 sm:mb-6">
            <div className="h-48 sm:h-64 lg:h-96 bg-gray-200 rounded-t-lg relative overflow-hidden">
              {/* Hero image: use the first image if available, otherwise auction.image, otherwise fallback to public file */}
              <Image
                src={auction.images && auction.images.length > 0 ? auction.images[0] : (auction.image || '/file.svg')}
                alt={auction.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                className="object-cover w-full h-full"
              />
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded font-medium text-sm">
                {auction.status.toUpperCase()}
              </div>
            </div>
            <div className="p-3 sm:p-4">
              <div className="flex space-x-2 overflow-x-auto">
                {(auction.images && auction.images.length > 0 ? auction.images : [auction.image || '/file.svg']).map((img, idx) => (
                  <div key={idx} className="rounded overflow-hidden flex-shrink-0" style={{ width: 48 }}>
                    <Image
                      src={img || '/file.svg'}
                      alt={`${auction.title} ${idx + 1}`}
                      width={64}
                      height={48}
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Car Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{auction.title}</h1>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Year</p>
                <p className="font-medium">{auction.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mileage</p>
                <p className="font-medium">{auction.mileage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Condition</p>
                <p className="font-medium">{auction.condition}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-xs sm:text-sm">{auction.location}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-700 text-sm sm:text-base">{auction.description}</p>
            </div>

            {auction.features && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {auction.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seller Info */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Seller Information</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden">
                  <Image
                    src={'/leaderboard/avatar-placeholder.jpg'}
                    alt={auction.seller}
                    width={48}
                    height={48}
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{auction.seller}</p>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={`${i < Math.floor(auction.sellerRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({auction.sellerRating})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bid History */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Bid History</h3>
            <div className="space-y-3">
              {auction.bidHistory?.map((bid, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium">${bid.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{bid.bidder}</p>
                  </div>
                  <p className="text-sm text-gray-600">{bid.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bidding Sidebar */}
        <div className="lg:col-span-1 order-first lg:order-last">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 sticky top-20">
            <div className="text-center mb-6">
              <div className="text-sm text-gray-600 mb-1">Time Remaining</div>
              <div className="text-xl sm:text-2xl font-bold text-red-600 mb-4">{auction.timeLeft}</div>
              
              <div className="text-sm text-gray-600 mb-1">Current Bid</div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">${auction.currentBid.toLocaleString()}</div>
              
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>{auction.bids} bids</span>
                <span>{auction.watchers} watching</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Bid (minimum: ${(auction.currentBid + 100).toLocaleString()})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={(auction.currentBid + 100).toString()}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            <button 
              onClick={handlePlaceBid}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium mb-3 transition-colors"
            >
              Place Bid
            </button>

            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 font-medium mb-6 transition-colors">
              <Heart size={16} className="inline mr-2" />
              Add to Watchlist
            </button>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Reserve Price:</span>
                <span className="font-medium">${auction.reservePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Auction Ends:</span>
                <span className="font-medium">{new Date(auction.endTime).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;