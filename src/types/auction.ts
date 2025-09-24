// src/types/auction.ts

export interface Auction {
  id: number;
  title: string;
  year: number;
  make: string;
  model: string;
  currentBid: number;
  reservePrice: number;
  timeLeft: string;
  endTime: string;
  image: string;
  status: 'active' | 'ended' | 'upcoming';
  bids: number;
  watchers: number;
  mileage: string;
  location: string;
  condition: string;
  seller: string;
  sellerRating: number;
  images?: string[];
  description?: string;
  features?: string[];
  bidHistory?: BidHistoryItem[];
}

export interface BidHistoryItem {
  amount: number;
  time: string;
  bidder: string;
}

export interface CarListing {
  make: string;
  model: string;
  year: number;
  mileage: string;
  condition: string;
  startingBid: number;
  reservePrice: number;
  auctionDuration: number;
  description: string;
  features: string[];
  images: File[];
}

export interface UserBid {
  id: number;
  carTitle: string;
  myBid: number;
  currentBid: number;
  status: 'winning' | 'outbid' | 'won' | 'lost';
  timeLeft: string;
  image: string;
  auctionEnd: string;
}

export interface UserListing {
  id: number;
  title: string;
  startingBid: number;
  currentBid: number;
  reservePrice: number;
  status: 'active' | 'reserve-not-met' | 'sold' | 'ended';
  timeLeft: string;
  bids: number;
  views: number;
  watchers: number;
  image: string;
  created: string;
}