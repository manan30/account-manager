import React from 'react';

type FloatingActionButtonProps = {
  icon: React.ReactElement;
  onClickHandler: () => void;
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onClickHandler
}) => {
  return (
    <button
      className='p-4 transition-all transform bg-indigo-600 rounded-full hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-offset-indigo-700 focus:ring-offset-2'
      onClick={onClickHandler}
    >
      {icon}
    </button>
  );
};

export default FloatingActionButton;
