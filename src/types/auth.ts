// types/auth.ts
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phone?: string;
  isVerified?: boolean;
  memberSince?: string;
  role?: "buyer" | "seller" | "both";

  // Profile completion
  profileCompletion: number;

  // Preferences
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
      bidAlerts: boolean;
      outbidAlerts: boolean;
      auctionUpdates: boolean;
    };
    currency: "USD" | "EUR" | "GBP";
    language: string;
    timezone: string;
  };

  // Stats
  stats: {
    totalBids: number;
    wonAuctions: number;
    activeWatchlist: number;
    totalSpent: number;
    averageBid: number;
    successRate: number;
  };

  // Financial
  wallet: {
    balance: number;
    pendingPayments: number;
    availableCredit: number;
  };

  // Verification status
  verification: {
    email: boolean;
    phone: boolean;
    identity: boolean;
    paymentMethod: boolean;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  acceptTerms: boolean;
  marketingConsent?: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}
