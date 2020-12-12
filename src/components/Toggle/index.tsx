import React, { useState } from 'react';
import cn from 'classnames';

const Toggle = () => {
  const [status, setStatus] = useState(false);
  const [firstClick, setFirstClick] = useState(false);

  const handleClick = () => {
    if (!firstClick) setFirstClick(true);
    setStatus((prevState) => !prevState);
  };

  return (
    <div className='h-4 w-12 rounded-lg bg-indigo-300 flex items-center shadow'>
      <button
        className={cn(
          'h-6 w-6 rounded-full bg-red-500',
          firstClick
            ? status
              ? 'transition-transform transform translate-x-6 duration-500 ease-out'
              : 'transition-transform transform translate-x-0 duration-500 ease-out'
            : 'bg-indigo-600'
        )}
        onClick={handleClick}
      ></button>
    </div>
  );
};

export default Toggle;
