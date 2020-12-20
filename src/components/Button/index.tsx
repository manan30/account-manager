import React from 'react';
import cn from 'classnames';
import Loader from '../Loader';

type ButtonProps = {
  buttonText: string;
  type?: 'submit' | 'reset' | 'button';
  loading?: boolean;
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<ButtonProps> = ({
  buttonText,
  onClickHandler,
  type = 'button',
  loading
}) => {
  return (
    <button
      type={type}
      className={cn(
        'w-full rounded-lg p-2 text-gray-200 hover:shadow-lg bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300 focus:shadow-lg',
        loading && 'hover:shadow-none opacity-50 cursor-default'
      )}
      onClick={onClickHandler}
      disabled={loading}
    >
      {!loading ? (
        buttonText
      ) : (
        <div className='grid place-items-center'>
          <Loader />
        </div>
      )}
    </button>
  );
};

export default Button;
