import React from 'react';
import cn from 'classnames';

type SettlementBadgeProps = {
  settled?: boolean;
};

const SettlementBadge: React.FC<SettlementBadgeProps> = ({ settled }) => {
  return (
    <span
      className={cn(
        'p-2 font-semibold text-center rounded-full whitespace-nowrap text-xxs md:text-xs',
        settled ? ' text-green-800 bg-green-200' : 'text-red-800 bg-red-200'
      )}
    >
      {settled ? 'Settled' : 'Not Settled'}
    </span>
  );
};

export default SettlementBadge;
