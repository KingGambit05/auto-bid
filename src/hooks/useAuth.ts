// hooks/useAuth.ts
"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, AuthContextType, LoginCredentials, RegisterData } from '@/types/auth';

// Mock user data
const mockUser: User = {
  id: "user-123",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  avatar: "/api/placeholder/100/100",
  phone: "+1 (555) 123-4567",
  isVerified: true,
  memberSince: "2023-01-15",
  role: "both",
  profileCompletion: 85,
  
  preferences: {
    notifications: {
      email: true,
      sms: true,
      push: true,
      bidAlerts: true,
      outbidAlerts: true,
      auctionUpdates: false,
    },
    currency: "USD",
    language: "en",
    timezone: "America/New_York",
  },
  
  stats: {
    totalBids: 47,
    wonAuctions: 12,
    activeWatchlist: 8,
    totalSpent: 145600,
    averageBid: 3098,
    successRate: 25.5,
  },
  
  wallet: {
    balance: 5000,
    pendingPayments: 1500,
    availableCredit: 10000,
  },
  
  verification: {
    email: true,
    phone: true,
    identity: true,
    paymentMethod: true,
  },
};

// Auth reducer
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

// Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      if (typeof window !== 'undefined') {
        const savedAuth = localStorage.getItem('auctionhub_auth');
        if (savedAuth) {
          try {
            const parsedAuth = JSON.parse(savedAuth);
            const { user, isAuthenticated } = parsedAuth;
            if (isAuthenticated && user) {
              dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            }
          } catch {
            localStorage.removeItem('auctionhub_auth');
          }
        }
      }
    };

    checkExistingSession();
  }, []);

  // Mock login function
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (credentials.email === 'john.doe@example.com' && credentials.password === 'demo123') {
        const authData = {
          user: mockUser,
          isAuthenticated: true,
        };

        // Save to localStorage if rememberMe is true
        if (credentials.rememberMe && typeof window !== 'undefined') {
          localStorage.setItem('auctionhub_auth', JSON.stringify(authData));
        }

        dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
        return true;
      } else {
        dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid email or password' });
        return false;
      }
    } catch {
      dispatch({ 
        type: 'LOGIN_ERROR', 
        payload: 'Login failed' 
      });
      return false;
    }
  };

  // Mock register function
  const register = async (data: RegisterData): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create new user from registration data
      const newUser: User = {
        ...mockUser,
        id: `user-${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        memberSince: new Date().toISOString().split('T')[0],
        profileCompletion: 40, // Lower for new users
        isVerified: false, // New users need verification
        verification: {
          email: false,
          phone: false,
          identity: false,
          paymentMethod: false,
        },
        stats: {
          totalBids: 0,
          wonAuctions: 0,
          activeWatchlist: 0,
          totalSpent: 0,
          averageBid: 0,
          successRate: 0,
        },
        wallet: {
          balance: 0,
          pendingPayments: 0,
          availableCredit: 1000, // Default credit limit
        },
      };

      const authData = {
        user: newUser,
        isAuthenticated: true,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('auctionhub_auth', JSON.stringify(authData));
      }
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
    } catch {
      dispatch({ 
        type: 'LOGIN_ERROR', 
        payload: 'Registration failed' 
      });
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auctionhub_auth');
    }
    dispatch({ type: 'LOGOUT' });
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'UPDATE_PROFILE', payload: data });
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        const savedAuth = localStorage.getItem('auctionhub_auth');
        if (savedAuth) {
          const authData = JSON.parse(savedAuth);
          authData.user = { ...authData.user, ...data };
          localStorage.setItem('auctionhub_auth', JSON.stringify(authData));
        }
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Clear error function
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
    updateProfile,
    clearError,
  };

  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Demo login helper for development
export const demoLogin = {
  email: 'john.doe@example.com',
  password: 'demo123',
};
