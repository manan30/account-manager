import React from 'react';
import cn from 'classnames';
import { XIcon } from '@heroicons/react/solid';

type ModalProps = {
  title?: string;
  hideCloseIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
  onCloseIconClick?: () => void;
};

const Modal: React.FC<ModalProps> = ({
  title,
  hideCloseIcon,
  children,
  size,
  onCloseIconClick
}) => {
  return (
    <div className='relative w-full h-full'>
      <div className='fixed inset-0 bg-gray-700 opacity-50' />
      <div className='fixed inset-0 flex items-center justify-center w-full h-full'>
        <div
          className={cn(
            'w-full p-4 mx-6 bg-gray-100 rounded-md sm:w-1/2 sm:-mx-6 lg:w-2/5',
            size === 'small' && 'md:w-1/3 lg:w-1/4'
          )}
        >
          {title || !hideCloseIcon ? (
            <div className='flex items-center mb-6'>
              {title ? (
                <div className='text-lg font-semibold tracking-wide text-indigo-700'>
                  {title}
                </div>
              ) : null}
              {!hideCloseIcon ? (
                <button
                  className='ml-auto focus:outline-none focus:ring-2 focus:ring-indigo-600'
                  onClick={onCloseIconClick}
                >
                  <XIcon className='w-6 h-6 text-gray-700' />
                </button>
              ) : null}
            </div>
          ) : null}
          <div className='overflow-y-auto max-h-96'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
