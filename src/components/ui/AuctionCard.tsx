// src/components/ui/AuctionCard.tsx
'use client';

import React from 'react';
import Image from "next/image";
import { Clock, Eye, Heart, Star } from 'lucide-react';
import { Auction } from '@/types/auction';

interface AuctionCardProps {
  auction: Auction;
  onClick: () => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ auction, onClick }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <div className="relative h-48 bg-gray-200">
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
          {auction.status.toUpperCase()}
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          <Clock size={14} className="inline mr-1" />
          {auction.timeLeft}
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          <Eye size={14} className="inline mr-1" />
          {auction.watchers}
        </div>
        <Image
            src={auction.image} 
            alt={auction.title}
            width={1000}
            height={1000}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{auction.title}</h3>
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-sm text-gray-600">Current Bid</p>
            <p className="text-lg font-semibold text-green-600">${auction.currentBid.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">{auction.bids} bids</p>
            <div className="flex items-center">
              <Star size={12} className="text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600 ml-1">{auction.sellerRating}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-600 mb-3">
          <span>{auction.mileage} miles</span>
          <span>{auction.location}</span>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Place Bid
          </button>
          <button 
            className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;