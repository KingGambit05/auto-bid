/* eslint-disable @typescript-eslint/no-explicit-any */
// types/leaderboard.ts
export interface BasePerson {
  rank: number;
  name: string;
  avatar: string;
  location: string;
  verified: boolean;
  change: number;
}

export interface Seller extends BasePerson {
  totalSales: number;
  vehiclesSold: number;
  avgSalePrice: number;
  successRate: number;
}

export interface Buyer extends BasePerson {
  totalSpent: number;
  vehiclesBought: number;
  avgPurchasePrice: number;
  categories: string[];
}

export interface Achievement {
  icon: any; // Lucide React Icon
  title: string;
  description: string;
  winner: string;
  value: string;
}

export interface HighValueSale {
  vehicle: string;
  seller: string;
  buyer: string;
  salePrice: number;
  date: string;
  image: string;
}

export type LeaderboardCategory = "sellers" | "buyers";