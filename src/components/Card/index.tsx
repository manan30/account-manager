import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className: classes }) => {
  return (
    <div
      className={'h-full w-full rounded-md bg-gray-100 shadow p-4'.concat(
        classes ?? ''
      )}
    >
      {children}
    </div>
  );
};

export default Card;
