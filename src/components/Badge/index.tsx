import React from 'react';
import { SpendingCategories } from '../../utils/Constants/AppConstants';

type BadgeProps = {
  type: string;
};

const Badge: React.FC<BadgeProps> = ({ type }) => {
  switch (type) {
    case SpendingCategories.OTHER:
      return (
        <div className='rounded-2xl bg-gray-700 text-gray-100 text-center xl:w-1/3 py-1 px-2 text-xxs tracking-wider font-bold'>
          {type}
        </div>
      );
    case SpendingCategories.RENT:
      return (
        <div className='rounded-2xl bg-orange-600 text-gray-100 text-center xl:w-1/3 py-1 px-2 text-xxs tracking-wider font-bold'>
          {type}
        </div>
      );
    case SpendingCategories.GROCERIES:
      return (
        <div className='rounded-2xl bg-purple-700 text-gray-100 text-center xl:w-1/2 py-1 px-2 text-xxs tracking-wider font-bold'>
          {type}
        </div>
      );
    case SpendingCategories.DINING:
      return (
        <div className='rounded-2xl bg-green-600 text-gray-100 text-center xl:w-1/2 py-1 px-2 text-xxs tracking-wider font-bold'>
          {type}
        </div>
      );
    case SpendingCategories.SHOPPING:
      return (
        <div className='rounded-2xl bg-blue-700 text-gray-100 text-center xl:w-1/2 py-1 px-2 text-xxs tracking-wider font-bold'>
          {type}
        </div>
      );
  }
  return <div>{type}</div>;
};

export default Badge;
