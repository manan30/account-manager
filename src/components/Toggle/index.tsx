import React, { useState } from 'react';
import cn from 'classnames';

const Toggle = () => {
  const [status, setStatus] = useState(false);

  return (
    <div className='h-4 w-12 rounded-lg bg-indigo-300 flex items-center shadow'>
      <button
        className={cn(
          'h-6 w-6 rounded-full',
          status ? 'animate-toggle-on' : 'animate-toggle-off'
        )}
        onClick={() => setStatus((prevState) => !prevState)}
      ></button>
    </div>
  );
};

export default Toggle;
