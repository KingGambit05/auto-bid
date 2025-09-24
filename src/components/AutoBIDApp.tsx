// src/components/AutoBIDApp.tsx
'use client';

import React, { useState } from 'react';
import Navigation from './layout/Navigation';
import BrowseAuctions from './pages/BrowseAuctions';
import AuctionDetail from './pages/AuctionDetail';
import SellCarForm from './pages/SellCarForm';
import MyBids from './pages/MyBids';
import MyListings from './pages/MyListings';
import Dashboard from './pages/Dashboard';
import { Auction } from '@/types/auction';

type PageType = 'browse' | 'auction-detail' | 'sell' | 'my-bids' | 'my-listings' | 'dashboard';

const AutoBIDApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('browse');
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);

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
        return <MyListings onCreateNew={() => setCurrentPage('sell')} />;
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