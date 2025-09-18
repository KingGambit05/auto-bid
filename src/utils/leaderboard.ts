// utils/leaderboard.ts
import { Crown, Medal, Award, ChevronUp, ChevronDown } from "lucide-react";
import React from "react";

export const getRankIcon = (rank: number): React.ReactElement => {
  switch (rank) {
    case 1:
      return React.createElement(Crown, { className: "h-6 w-6 text-yellow-500" });
    case 2:
      return React.createElement(Medal, { className: "h-6 w-6 text-gray-400" });
    case 3:
      return React.createElement(Award, { className: "h-6 w-6 text-amber-600" });
    default:
      return React.createElement("span", { className: "text-lg font-bold text-gray-600" }, `#${rank}`);
  }
};

export const getChangeIndicator = (change: number): React.ReactElement => {
  if (change > 0) {
    return React.createElement(ChevronUp, { className: "h-4 w-4 text-green-500" });
  } else if (change < 0) {
    return React.createElement(ChevronDown, { className: "h-4 w-4 text-red-500" });
  } else {
    return React.createElement("span", { className: "text-gray-400" }, "-");
  }
};