// src/components/pages/Dashboard.tsx
'use client';

import React from 'react';
import { Gavel, Heart, Car, Award, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { mockUserBids, mockUserListings } from '@/data/mockData';

const Dashboard: React.FC = () => {
  const activeBids = mockUserBids.filter(bid => bid.status === 'winning' || bid.status === 'outbid');
  const wonAuctions = mockUserBids.filter(bid => bid.status === 'won');
  const activeListings = mockUserListings.filter(listing => listing.status === 'active');

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: string;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, icon, color }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const RecentActivity: React.FC<{
    title: string;
    items: Array<{
      id: number;
      title: string;
      subtitle: string;
      status: string;
      statusColor: string;
      timeInfo: string;
    }>;
  }> = ({ title, items }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-12 h-8 bg-gray-200 rounded mr-3"></div>
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded text-xs font-medium ${item.statusColor}`}>
                  {item.status}
                </span>
                <p className="text-sm text-gray-600 mt-1">{item.timeInfo}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );

  const upcomingEndingSoon = [
    ...mockUserBids
      .filter(bid => bid.timeLeft !== 'Ended' && !bid.timeLeft.includes('d'))
      .map(bid => ({
        id: bid.id,
        title: bid.carTitle,
        subtitle: `Your bid: $${bid.myBid.toLocaleString()}`,
        status: bid.status.toUpperCase(),
        statusColor: bid.status === 'winning' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
        timeInfo: bid.timeLeft,
        type: 'bid' as const
      })),
    ...mockUserListings
      .filter(listing => listing.timeLeft !== 'Ended' && !listing.timeLeft.includes('d'))
      .map(listing => ({
        id: listing.id + 1000,
        title: listing.title,
        subtitle: `Current: $${listing.currentBid.toLocaleString()}`,
        status: 'ENDING SOON',
        statusColor: 'bg-red-100 text-red-800',
        timeInfo: listing.timeLeft,
        type: 'listing' as const
      }))
  ].sort((a, b) => {
    const timeA = a.timeInfo.includes('h') ? parseInt(a.timeInfo) : 999;
    const timeB = b.timeInfo.includes('h') ? parseInt(b.timeInfo) : 999;
    return timeA - timeB;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your auctions.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Active Bids" 
          value={activeBids.length} 
          change="+2 from last week"
          icon={<Gavel size={24} className="text-green-600" />}
          color="bg-green-50"
        />
        <StatCard 
          title="Watchlist" 
          value="12" 
          change="+3 this week"
          icon={<Heart size={24} className="text-green-600" />}
          color="bg-green-50"
        />
        <StatCard 
          title="My Listings" 
          value={activeListings.length} 
          icon={<Car size={24} className="text-green-600" />}
          color="bg-green-50"
        />
        <StatCard 
          title="Won Auctions" 
          value={wonAuctions.length} 
          change="+1 this month"
          icon={<Award size={24} className="text-green-600" />}
          color="bg-green-50"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
            <Gavel size={20} className="text-gray-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Browse Auctions</p>
              <p className="text-sm text-gray-600">Find cars to bid on</p>
            </div>
          </button>
          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
            <Car size={20} className="text-gray-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Sell Your Car</p>
              <p className="text-sm text-gray-600">Create new auction</p>
            </div>
          </button>
          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
            <Heart size={20} className="text-gray-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Manage Watchlist</p>
              <p className="text-sm text-gray-600">View saved cars</p>
            </div>
          </button>
        </div>
      </div>

      {/* Ending Soon Alert */}
      {upcomingEndingSoon.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Clock size={20} className="text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-red-900">Ending Soon</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEndingSoon.slice(0, 4).map(item => (
              <div key={`${item.type}-${item.id}`} className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                    <p className="text-sm font-medium text-red-600 mt-1">{item.timeInfo} remaining</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${item.statusColor}`}>
                    {item.type === 'bid' ? (item.status === 'WINNING' ? 'WINNING' : 'OUTBID') : 'MY LISTING'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {upcomingEndingSoon.length > 4 && (
            <p className="text-sm text-red-600 mt-4">
              And {upcomingEndingSoon.length - 4} more ending soon...
            </p>
          )}
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <RecentActivity 
          title="Recent Bids"
          items={mockUserBids.slice(0, 3).map(bid => ({
            id: bid.id,
            title: bid.carTitle,
            subtitle: `Your bid: ${bid.myBid.toLocaleString()}`,
            status: bid.status.toUpperCase(),
            statusColor: bid.status === 'winning' 
              ? 'bg-green-100 text-green-800' 
              : bid.status === 'outbid' 
              ? 'bg-red-100 text-red-800'
              : bid.status === 'won'
              ? 'bg-blue-100 text-green-800'
              : 'bg-gray-100 text-gray-800',
            timeInfo: bid.timeLeft
          }))}
        />

        <RecentActivity 
          title="My Active Listings"
          items={mockUserListings.map(listing => ({
            id: listing.id,
            title: listing.title,
            subtitle: `Current bid: ${listing.currentBid.toLocaleString()}`,
            status: listing.status.replace('-', ' ').toUpperCase(),
            statusColor: listing.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800',
            timeInfo: `${listing.bids} bids • ${listing.views} views`
          }))}
        />
      </div>

      {/* Market Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <TrendingUp size={24} className="text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">+12%</p>
            <p className="text-sm text-gray-600">Average auction growth</p>
            <p className="text-xs text-gray-500 mt-1">vs last month</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <DollarSign size={24} className="text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">$18.2K</p>
            <p className="text-sm text-gray-600">Average sale price</p>
            <p className="text-xs text-gray-500 mt-1">for your watched categories</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Gavel size={24} className="text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">156</p>
            <p className="text-sm text-gray-600">Active auctions</p>
            <p className="text-xs text-gray-500 mt-1">in your area</p>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-green-50 rounded-lg border border-green-200 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Tips for Success</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">For Buyers</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Set alerts for ending auctions</li>
              <li>• Research market values before bidding</li>
              <li>• Read seller descriptions carefully</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">For Sellers</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Upload high-quality photos</li>
              <li>• Write detailed descriptions</li>
              <li>• Set competitive reserve prices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;