// src/data/mockData.ts
import { Auction, UserBid, UserListing } from '@/types/auction';

export const mockAuctions: Auction[] = [
  {
    id: 1,
    title: '2020 Toyota Camry XLE',
    year: 2020,
    make: 'Toyota',
    model: 'Camry XLE',
    currentBid: 18500,
    reservePrice: 20000,
    timeLeft: '2h 30m',
    endTime: '2024-01-15T18:00:00',
    image: '/cars/toyota.jpg',
    status: 'active',
    bids: 23,
    watchers: 45,
    mileage: '35,000',
    location: 'San Francisco, CA',
    condition: 'Excellent',
    seller: 'John Motors',
    sellerRating: 4.8,
    images: ['/cars/toyota.jpg'],
    description: 'Well-maintained 2020 Toyota Camry XLE with full service history. Single owner, garage kept.',
    features: ['Leather Seats', 'Sunroof', 'Navigation', 'Backup Camera', 'Heated Seats'],
    bidHistory: [
      { amount: 18500, time: '2 min ago', bidder: 'Bidder ***23' },
      { amount: 18200, time: '15 min ago', bidder: 'Bidder ***07' },
      { amount: 18000, time: '32 min ago', bidder: 'Bidder ***15' },
    ]
  },
  {
    id: 2,
    title: '2019 Honda Civic Sport',
    year: 2019,
    make: 'Honda',
    model: 'Civic Sport',
    currentBid: 15200,
    reservePrice: 16500,
    timeLeft: '1d 5h',
    endTime: '2024-01-16T14:30:00',
    image: '/cars/honda.jpg',
    status: 'active',
    bids: 18,
    watchers: 32,
    mileage: '42,000',
    location: 'Los Angeles, CA',
    condition: 'Very Good',
    seller: 'AutoMax Dealers',
    sellerRating: 4.6
  },
  {
    id: 3,
    title: '2021 BMW 320i',
    year: 2021,
    make: 'BMW',
    model: '320i',
    currentBid: 22000,
    reservePrice: 24000,
    timeLeft: '3d 12h',
    endTime: '2024-01-18T20:00:00',
    image: '/cars/bmw.jpg',
    status: 'active',
    bids: 31,
    watchers: 67,
    mileage: '28,000',
    location: 'Seattle, WA',
    condition: 'Excellent',
    seller: 'Premium Auto',
    sellerRating: 4.9
  }
];

export const mockUserBids: UserBid[] = [
  {
    id: 1,
    carTitle: '2021 BMW 320i',
    myBid: 22000,
    currentBid: 23500,
    status: 'outbid',
    timeLeft: '4h 20m',
    image: '/cars/bmw.jpg',
    auctionEnd: '2024-01-18T20:00:00'
  },
  {
    id: 2,
    carTitle: '2020 Audi A4',
    myBid: 19500,
    currentBid: 19500,
    status: 'winning',
    timeLeft: '12h 45m',
    image: '/cars/audi.jpg',
    auctionEnd: '2024-01-16T10:30:00'
  },
  {
    id: 3,
    carTitle: '2019 Mercedes C-Class',
    myBid: 16800,
    currentBid: 16800,
    status: 'won',
    timeLeft: 'Ended',
    image: '/cars/mercedez.jpg',
    auctionEnd: '2024-01-14T15:00:00'
  }
];

export const mockUserListings: UserListing[] = [
  {
    id: 1,
    title: '2018 Mercedes C-Class',
    startingBid: 16000,
    currentBid: 18200,
    reservePrice: 19000,
    status: 'active',
    timeLeft: '3d 12h',
    bids: 15,
    views: 234,
    watchers: 28,
    image: '/cars/mercedez.jpg',
    created: '2024-01-12'
  },
  {
    id: 2,
    title: '2017 Audi Q5',
    startingBid: 14000,
    currentBid: 15500,
    reservePrice: 16500,
    status: 'reserve-not-met',
    timeLeft: '1d 8h',
    bids: 12,
    views: 189,
    watchers: 22,
    image: '/cars/audi.jpg',
    created: '2024-01-13'
  }
];