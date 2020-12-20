import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className: classes }) => {
  return (
    <div
      className={'h-full bg-gray-400 rounded-2xl '.concat(`${classes || ''}`)}
    >
      {children}
    </div>
  );
};

export default Card;
