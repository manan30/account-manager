import React from 'react';
import cn from 'classnames';

type LoaderProps = {
  size?: number;
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 24, color }) => {
  return (
    <div className='h-full w-full grid place-items-center'>
      <svg
        width={size}
        height={size}
        viewBox='0 0 38 38'
        xmlns='http://www.w3.org/2000/svg'
        className={cn(
          'animate-spin stroke-current',
          color ? color : 'text-indigo-600'
        )}
      >
        <g fill='none' fillRule='evenodd'>
          <g transform='translate(1 1)' strokeWidth='2'>
            <circle strokeOpacity='.5' cx='18' cy='18' r='18' />
            <path d='M36 18c0-9.94-8.06-18-18-18' />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Loader;
