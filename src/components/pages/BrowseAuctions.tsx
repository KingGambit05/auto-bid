// src/components/pages/BrowseAuctions.tsx
'use client';

import React, { useState } from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import AuctionCard from '@/components/ui/AuctionCard';
import { Auction } from '@/types/auction';
import { mockAuctions } from '@/data/mockData';

interface BrowseAuctionsProps {
  onAuctionSelect: (auction: Auction) => void;
}

const BrowseAuctions: React.FC<BrowseAuctionsProps> = ({ onAuctionSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('ending-soon');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'truck', label: 'Truck' },
    { value: 'convertible', label: 'Convertible' },
    { value: 'coupe', label: 'Coupe' },
    { value: 'hatchback', label: 'Hatchback' }
  ];

  const sortOptions = [
    { value: 'ending-soon', label: 'Ending Soon' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'most-bids', label: 'Most Bids' },
    { value: 'most-watched', label: 'Most Watched' }
  ];

  const handleApplyFilters = () => {
    setShowMobileFilters(false);
    // Apply filters logic here
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSortBy('ending-soon');
    setShowMobileFilters(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (sortBy !== 'ending-soon') count++;
    return count;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Active Auctions</h2>
          <p className="text-sm text-gray-600 mt-1">
            {mockAuctions.length} auctions currently live
          </p>
        </div>
        
        {/* Desktop Filters */}
        <div className="hidden lg:flex space-x-3">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[140px]"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[160px]"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={16} className="inline mr-2" />
            More Filters
          </button>
        </div>

        {/* Mobile/Tablet Filter Button */}
        <div className="lg:hidden">
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors relative"
          >
            <Filter size={16} className="mr-2" />
            Filters & Sort
            {getActiveFiltersCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== 'all' || sortBy !== 'ending-soon') && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-green-800">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-green-800 text-xs rounded-full">
                {categories.find(c => c.value === selectedCategory)?.label}
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {sortBy !== 'ending-soon' && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-green-800 text-xs rounded-full">
                {sortOptions.find(s => s.value === sortBy)?.label}
                <button 
                  onClick={() => setSortBy('ending-soon')}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            <button 
              onClick={handleResetFilters}
              className="text-xs text-green-600 hover:text-green-800 underline ml-2"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Desktop Advanced Filters */}
      {showAdvancedFilters && (
        <div className="hidden lg:block mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Any Price</option>
                <option>Under $10,000</option>
                <option>$10,000 - $25,000</option>
                <option>$25,000 - $50,000</option>
                <option>$50,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Any Year</option>
                <option>2020+</option>
                <option>2015-2019</option>
                <option>2010-2014</option>
                <option>Before 2010</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Any Mileage</option>
                <option>Under 25,000</option>
                <option>25,000 - 50,000</option>
                <option>50,000 - 100,000</option>
                <option>100,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ending Time</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Any Time</option>
                <option>Next Hour</option>
                <option>Next 6 Hours</option>
                <option>Next 24 Hours</option>
                <option>Next 3 Days</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button 
              onClick={() => setShowAdvancedFilters(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Auctions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {mockAuctions.map(auction => (
          <AuctionCard 
            key={auction.id} 
            auction={auction} 
            onClick={() => onAuctionSelect(auction)}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors">
          Load More Auctions
        </button>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMobileFilters(false)}
          />
          
          {/* Modal */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl z-50 max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Filters & Sort</h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-6">
              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
                <div className="space-y-2">
                  {sortOptions.map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.value} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Filters */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Any Price</option>
                    <option>Under $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>$25,000 - $50,000</option>
                    <option>$50,000+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Any Year</option>
                    <option>2020+</option>
                    <option>2015-2019</option>
                    <option>2010-2014</option>
                    <option>Before 2010</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ending Time</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Any Time</option>
                    <option>Next Hour</option>
                    <option>Next 6 Hours</option>
                    <option>Next 24 Hours</option>
                    <option>Next 3 Days</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-3">
                <button 
                  onClick={handleResetFilters}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                >
                  Reset
                </button>
                <button 
                  onClick={handleApplyFilters}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BrowseAuctions;