// components/leaderboard/RecentSales.tsx
import React from "react";
import { HighValueSale } from "@/types/leaderboard";

interface RecentSalesProps {
  sales: HighValueSale[];
}

const RecentSales: React.FC<RecentSalesProps> = ({ sales }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Recent High-Value Sales
          </h2>
          <p className="text-lg text-gray-600">
            The latest notable transactions from our premium auctions.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-black">Latest Transactions</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {sales.map((sale, index) => (
              <div 
                key={index} 
                className="p-6 flex items-center space-x-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <img
                  src={sale.image}
                  alt={sale.vehicle}
                  className="w-16 h-12 bg-gray-300 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-black mb-1">{sale.vehicle}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Seller: {sale.seller}</span>
                    <span>•</span>
                    <span>Buyer: {sale.buyer}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold text-green-600">
                    ${sale.salePrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">{sale.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentSales;