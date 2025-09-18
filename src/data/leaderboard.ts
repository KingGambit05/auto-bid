// data/leaderboard.ts
import { Crown, Trophy, Award, Medal } from "lucide-react";
import { Seller, Buyer, Achievement, HighValueSale } from "@/types/leaderboard";

export const topSellers: Seller[] = [
  {
    rank: 1,
    name: "Premium Auto Group",
    avatar: "/leaderboard/premium-auto-group.jpg",
    location: "Los Angeles, CA",
    totalSales: 2450000,
    vehiclesSold: 47,
    avgSalePrice: 52127,
    successRate: 98.3,
    verified: true,
    change: 2
  },
  {
    rank: 2,
    name: "Classic Car Collective",
    avatar: "/leaderboard/classic-car.jpg",
    location: "Miami, FL",
    totalSales: 1890000,
    vehiclesSold: 23,
    avgSalePrice: 82174,
    successRate: 100.0,
    verified: true,
    change: 1
  },
  {
    rank: 3,
    name: "Elite Motors",
    avatar: "/leaderboard/elite-motors.jpg",
    location: "New York, NY",
    totalSales: 1675000,
    vehiclesSold: 31,
    avgSalePrice: 54032,
    successRate: 96.8,
    verified: true,
    change: -1
  },
  {
    rank: 4,
    name: "Heritage Automotive",
    avatar: "/leaderboard/heritage-Automotive.jpg",
    location: "Chicago, IL",
    totalSales: 1456000,
    vehiclesSold: 19,
    avgSalePrice: 76632,
    successRate: 94.7,
    verified: true,
    change: 3
  },
  {
    rank: 5,
    name: "Luxury Car Specialists",
    avatar: "/leaderboard/luxury-car-specialist.jpg",
    location: "Dallas, TX",
    totalSales: 1234000,
    vehiclesSold: 28,
    avgSalePrice: 44071,
    successRate: 92.9,
    verified: false,
    change: -2
  }
];

export const topBuyers: Buyer[] = [
  {
    rank: 1,
    name: "Michael Chen",
    avatar: "/leaderboard/avatar-placeholder.jpg",
    location: "San Francisco, CA",
    totalSpent: 890000,
    vehiclesBought: 12,
    avgPurchasePrice: 74167,
    categories: ["Luxury", "Sports"],
    verified: true,
    change: 0
  },
  {
    rank: 2,
    name: "Sarah Rodriguez",
    avatar: "/leaderboard/avatar-placeholder.jpg",
    location: "Austin, TX",
    totalSpent: 567000,
    vehiclesBought: 8,
    avgPurchasePrice: 70875,
    categories: ["Classic", "Vintage"],
    verified: true,
    change: 2
  },
  {
    rank: 3,
    name: "David Park",
    avatar: "/leaderboard/avatar-placeholder.jpg",
    location: "Seattle, WA",
    totalSpent: 445000,
    vehiclesBought: 15,
    avgPurchasePrice: 29667,
    categories: ["Sports", "Electric"],
    verified: true,
    change: -1
  },
  {
    rank: 4,
    name: "Jennifer Martinez",
    avatar: "/leaderboard/avatar-placeholder.jpg",
    location: "Denver, CO",
    totalSpent: 389000,
    vehiclesBought: 7,
    avgPurchasePrice: 55571,
    categories: ["Luxury", "Classic"],
    verified: true,
    change: 1
  },
  {
    rank: 5,
    name: "Robert Johnson",
    avatar: "/leaderboard/avatar-placeholder.jpg",
    location: "Atlanta, GA",
    totalSpent: 298000,
    vehiclesBought: 11,
    avgPurchasePrice: 27091,
    categories: ["Sports", "Muscle"],
    verified: false,
    change: -1
  }
];

export const achievements: Achievement[] = [
  {
    icon: Crown,
    title: "Top Seller",
    description: "Highest total sales this month",
    winner: "Premium Auto Group",
    value: "$2.45M"
  },
  {
    icon: Trophy,
    title: "Most Sales",
    description: "Highest number of vehicles sold",
    winner: "Premium Auto Group",
    value: "47 cars"
  },
  {
    icon: Award,
    title: "Best Success Rate",
    description: "Highest auction success rate",
    winner: "Classic Car Collective",
    value: "100%"
  },
  {
    icon: Medal,
    title: "Highest Single Sale",
    description: "Most expensive vehicle sold",
    winner: "Classic Car Collective",
    value: "$875K"
  }
];

export const recentHighSales: HighValueSale[] = [
  {
    vehicle: "1963 Ferrari 250 GTO",
    seller: "Classic Car Collective",
    buyer: "Private Collector",
    salePrice: 875000,
    date: "2024-09-15",
    image: "/leaderboard/ferrari-250-gto.jpg"
  },
  {
    vehicle: "2022 McLaren P1",
    seller: "Premium Auto Group",
    buyer: "Michael Chen",
    salePrice: 450000,
    date: "2024-09-14",
    image: "/leaderboard/mclaren-p1.jpg"
  },
  {
    vehicle: "1969 Dodge Charger R/T",
    seller: "Heritage Automotive",
    buyer: "Sarah Rodriguez",
    salePrice: 125000,
    date: "2024-09-13",
    image: "/leaderboard/1969-dodge-charger.jpg"
  }
];