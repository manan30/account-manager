import React from 'react';
import { XIcon } from '@heroicons/react/solid';

type ModalProps = {
  title: string;
  hideCloseIcon?: boolean;
  onCloseIconClick?: () => void;
};

const Modal: React.FC<ModalProps> = ({
  title,
  hideCloseIcon,
  children,
  onCloseIconClick
}) => {
  return (
    <div className='relative w-full h-full'>
      <div className='fixed inset-0 bg-gray-700 opacity-50' />
      <div className='fixed inset-0 flex items-center justify-center w-full h-full'>
        <div className='w-full p-4 mx-6 bg-gray-100 rounded-md sm:w-1/2 sm:-mx-6 lg:w-2/5'>
          <div className='flex items-center mb-6'>
            <div className='text-lg font-semibold tracking-wide text-indigo-700'>
              {title}
            </div>
            {hideCloseIcon ? (
              <button
                className='ml-auto focus:outline-none focus:ring-2 focus:ring-indigo-600'
                onClick={onCloseIconClick}
              >
                <XIcon className='w-6 h-6 text-gray-700' />
              </button>
            ) : null}
          </div>
          <div className='overflow-y-auto max-h-96'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
