// components/leaderboard/BuyerTable.tsx
import React from "react";
import Image from "next/image";
import { Buyer } from "@/types/leaderboard";
import { getRankIcon, getChangeIndicator } from "@/utils/leaderboard";

interface BuyerTableProps {
  buyers: Buyer[];
}

const BuyerTable: React.FC<BuyerTableProps> = ({ buyers }) => {
  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Rank
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Buyer
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total Spent
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Vehicles
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Avg Price
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Categories
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Change
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {buyers.map((buyer) => (
          <tr key={buyer.rank} className="hover:bg-gray-50 transition-colors duration-200">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                {getRankIcon(buyer.rank)}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                {/* <img
                  src={buyer.avatar}
                  alt={buyer.name}
                  className="w-10 h-10 bg-gray-300 rounded-full mr-4 object-cover"
                /> */}
                <Image
                  src={buyer.avatar}
                  alt={buyer.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 bg-gray-300 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-black">{buyer.name}</span>
                    {buyer.verified && (
                      <svg className="w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{buyer.location}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-semibold text-black">
                ${buyer.totalSpent.toLocaleString()}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{buyer.vehiclesBought}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">${buyer.avgPurchasePrice.toLocaleString()}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex flex-wrap gap-1">
                {buyer.categories.map((category: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                {getChangeIndicator(buyer.change)}
                {buyer.change !== 0 && (
                  <span className="ml-1 text-sm text-gray-600">
                    {Math.abs(buyer.change)}
                  </span>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BuyerTable;