/* eslint-disable @next/next/no-img-element */
// components/leaderboard/Podium.tsx
import React from "react";
import Image from "next/image";
import { Seller, Buyer, LeaderboardCategory } from "@/types/leaderboard";
import { getRankIcon } from "@/utils/leaderboard";

interface PodiumProps {
  data: (Seller | Buyer)[];
  category: LeaderboardCategory;
}

const Podium: React.FC<PodiumProps> = ({ data, category }) => {
  const topThree = data.slice(0, 3);
  
  return (
    <div className="flex justify-center items-end space-x-8 mb-12">
      {topThree.map((user, index) => {
        const positions = [1, 0, 2]; // Center, Left, Right for visual appeal
        const actualIndex = positions[index];
        const heights = ["h-32", "h-40", "h-24"];
        const userData = topThree[actualIndex];
        
        return (
          <div key={userData.rank} className="text-center">
            <div className="relative mb-4">
              <Image
                src={userData.avatar}
                alt={userData.name}
                width={1000}
                height={1000}
                className="w-20 h-20 bg-gray-300 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
              {userData.verified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className={`bg-gray-100 rounded-t-lg ${heights[actualIndex]} flex flex-col justify-end p-4 min-w-[200px]`}>
              <div className="mb-2">
                {getRankIcon(userData.rank)}
              </div>
              <h3 className="font-semibold text-black text-sm mb-1">{userData.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{userData.location}</p>
              <div className="text-lg font-bold text-black">
                ${category === "sellers" 
                  ? (userData as Seller).totalSales?.toLocaleString() 
                  : (userData as Buyer).totalSpent?.toLocaleString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Podium;