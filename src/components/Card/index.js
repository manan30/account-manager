import React from 'react';

function Card({ children, className: classes }) {
  return (
    <div className={'h-48 bg-gray-400 rounded-2xl p-6'.concat(` ${classes}`)}>
      {children}
    </div>
  );
}

export default Card;
