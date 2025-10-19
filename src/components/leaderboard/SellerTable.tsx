/* eslint-disable @next/next/no-img-element */
// components/leaderboard/SellerTable.tsx
import React from "react";
import Image from "next/image";
import { Seller } from "@/types/leaderboard";
import { getRankIcon, getChangeIndicator } from "@/utils/leaderboard";

interface SellerTableProps {
  sellers: Seller[];
}

const SellerTable: React.FC<SellerTableProps> = ({ sellers }) => {
  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Rank
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Seller
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total Sales
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Vehicles
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Avg Price
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Success Rate
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Change
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {sellers.map((seller) => (
          <tr key={seller.rank} className="hover:bg-gray-50 transition-colors duration-200">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                {getRankIcon(seller.rank)}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <Image
                  src={seller.avatar}
                  alt={seller.name}
                  width={1000}
                  height={1000}
                  className="w-10 h-10 bg-gray-300 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-black">{seller.name}</span>
                    {seller.verified && (
                      <svg className="w-4 h-4 text-green-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{seller.location}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-semibold text-black">
                ${seller.totalSales.toLocaleString()}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{seller.vehiclesSold}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">${seller.avgSalePrice.toLocaleString()}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-green-600 font-medium">{seller.successRate}%</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                {getChangeIndicator(seller.change)}
                {seller.change !== 0 && (
                  <span className="ml-1 text-sm text-gray-600">
                    {Math.abs(seller.change)}
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

export default SellerTable;