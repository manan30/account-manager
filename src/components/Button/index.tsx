import React from 'react';
import cn from 'classnames';

type ButtonProps = {
  buttonText?: string;
  type?: 'submit' | 'reset' | 'button';
  layout?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
  layout,
  loading,
  disabled,
  className,
  children
}) => {
  return (
    <button
      type={type}
      className={cn(
        'rounded-md px-2 py-1 min-w-button focus:outline-none focus:ring-1 focus:ring-offset-2 text-sm font-medium h-8 flex items-center justify-center transition-shadow',
        layout === 'secondary'
          ? 'bg-gray-300 text-gray-800 focus:ring-gray-400 '
          : 'bg-indigo-600 text-gray-100 focus:ring-indigo-600 ',
        (loading || disabled) && 'opacity-50 cursor-default',
        className ? className : null
      )}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? (
        <svg
          className='w-5 h-5 text-white animate-spin'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
