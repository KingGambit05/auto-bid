// src/components/pages/BrowseAuctions.tsx
'use client';

import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import AuctionCard from '@/components/ui/AuctionCard';
import { Auction } from '@/types/auction';
import { mockAuctions } from '@/data/mockData';

interface BrowseAuctionsProps {
  onAuctionSelect: (auction: Auction) => void;
}

const BrowseAuctions: React.FC<BrowseAuctionsProps> = ({ onAuctionSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('ending-soon');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Active Auctions</h2>
        <div className="flex space-x-3">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
            <option value="convertible">Convertible</option>
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ending-soon">Ending Soon</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50">
            <Filter size={16} className="inline mr-2" />
            More Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAuctions.map(auction => (
          <AuctionCard 
            key={auction.id} 
            auction={auction} 
            onClick={() => onAuctionSelect(auction)}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowseAuctions;