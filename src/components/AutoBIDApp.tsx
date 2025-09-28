// src/components/AutoBIDApp.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Navigation from './layout/UserNavbar';
import BrowseAuctions from './pages/BrowseAuctions';
import AuctionDetail from './pages/AuctionDetail';
import SellCarForm from './pages/SellCarForm';
import MyBids from './pages/MyBids';
import MyListings from './pages/MyListings';
import Dashboard from './pages/Dashboard';
import ManageListing from './pages/ManageListing';
import ListingAnalytics from './pages/ListingAnalytics';
import { mockAuctions, mockUserListings } from '@/data/mockData';
import { Auction } from '@/types/auction';
import { redirect } from 'next/navigation';

type PageType = 'browse' | 'auction-detail' | 'sell' | 'my-bids' | 'my-listings' | 'dashboard' | 'manage-listing' | 'listing-analytics';

const AutoBIDApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('browse');
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [currentListingId, setCurrentListingId] = useState<number | null>(null);
  const { isLoading, isAuthenticated } = useAuth();

  // Redirect if not authenticated
  if (!isAuthenticated && !isLoading) {
    redirect('/landing')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AutoBID...</p>
        </div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'browse':
        return (
          <BrowseAuctions 
            onAuctionSelect={(auction) => {
              setSelectedAuction(auction);
              setCurrentPage('auction-detail');
            }} 
          />
        );
      case 'auction-detail':
        return (
          <AuctionDetail 
            auction={selectedAuction}
            onBack={() => setCurrentPage('browse')}
          />
        );
      case 'sell':
        return <SellCarForm />;
      case 'my-bids':
        return <MyBids />;
      case 'my-listings':
        return (
          <MyListings 
            onCreateNew={() => setCurrentPage('sell')}
            onViewListing={(id) => {
              // Try to find an auction with the same id in mock data
              const found = mockAuctions.find(a => a.id === id);
              if (found) {
                setSelectedAuction(found);
              } else {
                // Fallback: construct a minimal Auction object from the user listing
                const ul = mockUserListings.find(u => u.id === id);
                if (ul) {
                  const constructed: Auction = {
                    id: 1000 + ul.id,
                    title: ul.title,
                    year: new Date().getFullYear(),
                    make: ul.title.split(' ')[1] || 'Make',
                    model: ul.title,
                    currentBid: ul.currentBid,
                    reservePrice: ul.reservePrice,
                    timeLeft: ul.timeLeft,
                    endTime: new Date().toISOString(),
                    image: ul.image,
                    status: ul.status === 'active' ? 'active' : 'ended',
                    bids: ul.bids,
                    watchers: ul.watchers,
                    mileage: 'Unknown',
                    location: 'Unknown',
                    condition: 'Unknown',
                    seller: 'You',
                    sellerRating: 4.5
                  };
                  setSelectedAuction(constructed);
                } else {
                  setSelectedAuction(null);
                }
              }
              setCurrentPage('auction-detail');
            }}
            onManageListing={(id) => {
              setCurrentListingId(id);
              setCurrentPage('manage-listing');
            }}
            onViewAnalytics={(id) => {
              setCurrentListingId(id);
              setCurrentPage('listing-analytics');
            }}
          />
        );
      case 'manage-listing':
        return currentListingId ? (
          <ManageListing listingId={currentListingId} onBack={() => setCurrentPage('my-listings')} />
        ) : (
          <MyListings onCreateNew={() => setCurrentPage('sell')} />
        );
      case 'listing-analytics':
        return currentListingId ? (
          <ListingAnalytics listingId={currentListingId} onBack={() => setCurrentPage('my-listings')} />
        ) : (
          <MyListings onCreateNew={() => setCurrentPage('sell')} />
        );
      case 'dashboard':
        return <Dashboard />;
      default:
        return <BrowseAuctions onAuctionSelect={(auction) => {
          setSelectedAuction(auction);
          setCurrentPage('auction-detail');
        }} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
      />
      {renderCurrentPage()}
    </div>
  );
};

export default AutoBIDApp;