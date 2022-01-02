import React from 'react';
import { SpendingCategories } from '../../utils/Constants/AppConstants';

type BadgeProps = {
  type: string;
};

const Badge: React.FC<BadgeProps> = ({ type }) => {
  const bgColor = (() => {
    switch (type) {
      case SpendingCategories.OTHER:
        return 'bg-gray-700';
      case SpendingCategories.RENT:
        return 'bg-orange-600';
      case SpendingCategories.GROCERIES:
        return 'bg-purple-700';
      case SpendingCategories.DINING:
        return 'bg-green-600';
      case SpendingCategories.SHOPPING:
        return 'bg-blue-700';
      default:
        return 'bg-indigo-600';
    }
  })();

  return (
    <div
      className={`px-4 py-1 font-bold tracking-wider text-center text-gray-100 rounded-2xl text-xxs-badge sm:text-xs ${bgColor}`}
    >
      {type}
    </div>
  );
};

export default Badge;
