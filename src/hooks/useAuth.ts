// hooks/useAuth.ts
"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  AuthState,
  AuthContextType,
  LoginCredentials,
  RegisterData,
} from "@/types/auth";
import { supabase } from "@/lib/supabaseClient";
import { throws } from "assert";

// User database prototype

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
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "REGISTER_START" }
  | { type: "REGISTER_SUCCESS"; payload: User }
  | { type: "REGISTER_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE"; payload: Partial<User> }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "REGISTER_START":
      return { ...state, isLoading: true, error: null };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "SET_LOADING":
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
      if (typeof window !== "undefined") {
        const savedAuth = localStorage.getItem("auctionhub_auth");
        if (savedAuth) {
          try {
            const parsedAuth = JSON.parse(savedAuth);
            const { user, isAuthenticated } = parsedAuth;
            if (isAuthenticated && user) {
              dispatch({ type: "LOGIN_SUCCESS", payload: user });
            }
          } catch (error) {
            localStorage.removeItem("auctionhub_auth");
          }
        }
      }
    };

    checkExistingSession();
  }, []);

  // Mock login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: "LOGIN_START" });

    try {
      // Simulate API call delay
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      const supabaseUser = data.user;

      if (!supabaseUser) throw new Error("No user returned from supabase");

      const authData = {
        user: supabaseUser,
        isAuthenticated: true,
      };

      if (credentials.rememberMe && typeof window !== "undefined") {
        localStorage.setItem("auctionhub_auth", JSON.stringify(authData));
      }

      // Mock validation
      // if (
      //   credentials.email === "demo@auctionhub.com" &&
      //   credentials.password === "demo123"
      // ) {
      //   const authData = {
      //     user: mockUser,
      //     isAuthenticated: true,
      //   };

      //   // Save to localStorage if rememberMe is true
      //   if (credentials.rememberMe && typeof window !== "undefined") {
      //     localStorage.setItem("auctionhub_auth", JSON.stringify(authData));
      //   }

      //   dispatch({ type: "LOGIN_SUCCESS", payload: mockUser });
      // } else {
      //   throw new Error("Invalid email or password");
      // }
      dispatch({ type: "LOGIN_SUCCESS", payload: mockUser });
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: error instanceof Error ? error.message : "Login failed",
      });
    }
  };

  // Mock register function
  const register = async (data: RegisterData): Promise<void> => {
    dispatch({ type: "REGISTER_START" });

    try {
      // Simulate API call delay
      // await new Promise(resolve => setTimeout(resolve, 1500));
      const { data: result, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      const supabaseUser = result.user;
      if (!supabaseUser) throw new Error("Failed to create user.");

      // const { error: profileError } = await supabase.from("profiles").insert({
      //   id: supabaseUser.id,
      //   first_name: data.firstName,
      //   last_name: data.lastName,
      //   phone: data.phone,
      //   is_verified: false,
      //   member_since: new Date().toISOString().split("T")[0],
      // });

      // if (profileError) throw profileError;

      // Create new user from registration data
      const newUser: User = {
        ...mockUser,
        id: supabaseUser.id,
        email: supabaseUser.email ?? "",
        firstName: "",
        lastName: "",
        phone: "",
        memberSince: new Date().toISOString().split("T")[0],
        profileCompletion: 0, // Lower for new users
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

      if (typeof window !== "undefined") {
        const authData = localStorage.setItem(
          "auctionhub_auth",
          JSON.stringify({ user: newUser, isAuthenticated: true })
        );
      }

      console.log("Auth data object:", authData);

      dispatch({ type: "REGISTER_SUCCESS", payload: newUser });
    } catch (error) {
      dispatch({
        type: "REGISTER_ERROR",
        payload: error instanceof Error ? error.message : "Registration failed",
      });
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auctionhub_auth");
    }
    dispatch({ type: "LOGOUT" });
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      dispatch({ type: "UPDATE_PROFILE", payload: data });

      // Update localStorage
      if (typeof window !== "undefined") {
        const savedAuth = localStorage.getItem("auctionhub_auth");
        if (savedAuth) {
          const authData = JSON.parse(savedAuth);
          authData.user = { ...authData.user, ...data };
          localStorage.setItem("auctionhub_auth", JSON.stringify(authData));
        }
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Clear error function
  const clearError = (): void => {
    dispatch({ type: "CLEAR_ERROR" });
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Demo login helper for development
export const demoLogin = {
  email: "demo@auctionhub.com",
  password: "demo123",
};
