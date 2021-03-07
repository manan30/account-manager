import React from 'react';
import cn from 'classnames';
import Loader from '../Loader';

type ButtonProps = {
  buttonText: string;
  type?: 'submit' | 'reset' | 'button';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<ButtonProps> = ({
  buttonText,
  className: classes,
  onClickHandler,
  type = 'button',
  loading,
  disabled
}) => {
  return (
    <button
      type={type}
      className={cn(
        'w-full rounded-lg p-2 text-gray-200 hover:shadow-lg bg-indigo-600 focus:outline-none focus:border-indigo-300 focus:shadow-lg',
        (loading || disabled) && 'hover:shadow-none opacity-50 cursor-default',
        classes && classes
      )}
      onClick={onClickHandler}
      disabled={loading || disabled}
    >
      {!loading ? (
        buttonText
      ) : (
        <div className='grid place-items-center'>
          <Loader color='text-gray-200' />
        </div>
      )}
    </button>
  );
};

export default Button;
