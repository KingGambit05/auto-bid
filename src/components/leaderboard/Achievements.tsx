// components/leaderboard/Achievements.tsx
import React from "react";
import { Achievement } from "@/types/leaderboard";

interface AchievementsProps {
  achievements: Achievement[];
}

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Monthly Achievements
          </h2>
          <p className="text-lg text-gray-600">
            Celebrating exceptional performance in our auction community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-sm border text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-full mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                <div className="text-sm font-medium text-black mb-1">{achievement.winner}</div>
                <div className="text-2xl font-bold text-black">{achievement.value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;