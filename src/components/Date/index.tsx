import React from 'react';
import { useWindowSize } from '../../hooks/Device/useWindowSize';

type DateProps = { date?: Date };

const Date: React.FC<DateProps> = ({ date }) => {
  const { isMobile } = useWindowSize();

  return (
    <>
      {!isMobile
        ? new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            month: 'short',
            year: 'numeric',
            day: 'numeric'
          }).format(date)
        : new Intl.DateTimeFormat('en-US', {
            month: '2-digit',
            year: '2-digit',
            day: '2-digit'
          }).format(date)}
    </>
  );
};

export default Date;
