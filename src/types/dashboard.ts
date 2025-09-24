// types/dashboard.ts
export interface DashboardStats {
  totalBids: number;
  activeBids: number;
  wonAuctions: number;
  watchlistItems: number;
  totalSpent: number;
  averageBid: number;
  successRate: number;
  savedAmount: number;
}

export interface RecentActivity {
  id: string;
  type: 'bid_placed' | 'bid_won' | 'bid_lost' | 'auction_watched' | 'auction_ended' | 'payment_completed';
  title: string;
  description: string;
  amount?: number;
  timestamp: string;
  vehicleId?: string;
  vehicleTitle?: string;
  vehicleImage?: string;
  status?: 'success' | 'warning' | 'info' | 'error';
}

export interface ActiveBid {
  id: string;
  vehicleId: string;
  vehicleTitle: string;
  vehicleImage: string;
  currentBid: number;
  myMaxBid: number;
  isWinning: boolean;
  timeLeft: string;
  endDate: string;
  location: string;
  totalBids: number;
}

export interface WatchlistItem {
  id: string;
  vehicleId: string;
  vehicleTitle: string;
  vehicleImage: string;
  currentBid: number;
  estimatedValue: number;
  timeLeft: string;
  endDate: string;
  location: string;
  totalBids: number;
  reserveMet: boolean;
  priceAlert?: number;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: unknown;
  href: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export interface Notification {
  id: string;
  type: 'bid_outbid' | 'auction_ending' | 'auction_won' | 'payment_due' | 'price_alert';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface RecentTransaction {
  id: string;
  type: 'purchase' | 'refund' | 'deposit' | 'withdrawal';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}