import React, { useEffect, useState } from 'react';
import cn from 'classnames';

type ToggleProps = {
  value?: boolean;
  handleToggle?: (state: boolean) => void;
};

const Toggle: React.FC<ToggleProps> = ({ value = false, handleToggle }) => {
  const [status, setStatus] = useState(value);

  const handleClick = () => {
    if (handleToggle) handleToggle(!status);
    setStatus((prevState) => !prevState);
  };

  useEffect(() => {
    setStatus(value);
  }, [value]);

  return (
    <div className='h-4 w-12 rounded-lg bg-indigo-100 flex items-center shadow'>
      <button
        className={cn(
          'h-6 w-6 rounded-full',
          status
            ? 'transition transform translate-x-6 duration-500 ease-out bg-indigo-600'
            : 'transition-transform transform translate-x-0 duration-500 ease-out bg-indigo-200'
        )}
        onClick={handleClick}
      ></button>
    </div>
  );
};

export default Toggle;
