import React from 'react';
import cn from 'classnames';
import Loader from '../Loader';

type ButtonProps = {
  buttonText?: string;
  type?: 'submit' | 'reset' | 'button';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<ButtonProps> = ({
  buttonText,
  className: classes,
  onClickHandler,
  type = 'button',
  loading,
  disabled,
  children
}) => {
  return (
    <button
      type={type}
      className={cn(
        'rounded-lg p-2 text-gray-200',
        (loading || disabled) && 'hover:shadow-none opacity-50 cursor-default',
        classes && classes
      )}
      onClick={onClickHandler}
      disabled={loading || disabled}
    >
      {/* {!loading ? (
        buttonText
      ) : (
        <div className='grid place-items-center'>
          <Loader color='text-gray-200' />
        </div>
      )} */}
      {children}
    </button>
  );
};

export default Button;
