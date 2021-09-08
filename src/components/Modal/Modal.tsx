import React, { useEffect } from 'react';
import { XIcon } from '@heroicons/react/solid';

type ModalProps = {
  title: string;
  disableClose?: boolean;
  onCloseIconClick: () => void;
};

const Modal: React.FC<ModalProps> = ({
  title,
  disableClose,
  onCloseIconClick,
  children
}) => {
  useEffect(() => {
    if (!disableClose) {
      const handleEscKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onCloseIconClick();
      };

      document.addEventListener('keyup', handleEscKeyPress);
      return () => document.removeEventListener('keyup', handleEscKeyPress);
    }
  }, [disableClose, onCloseIconClick]);

  return (
    <div className='relative w-full h-full'>
      <div className='fixed inset-0 bg-gray-700 opacity-50' />
      <div className='fixed inset-0 flex items-center justify-center w-full h-full'>
        <div className='w-full p-4 bg-gray-100 rounded-md sm:w-2/4 lg:w-4/12'>
          <div className='flex items-center mb-6'>
            <div className='text-lg font-semibold tracking-wide text-indigo-700'>
              {title}
            </div>
            <button
              className='ml-auto focus:outline-none focus:ring-2 focus:ring-indigo-600'
              onClick={onCloseIconClick}
              disabled={disableClose}
            >
              <XIcon className='w-6 h-6 text-gray-700' />
            </button>
          </div>
          <div className='overflow-y-auto max-h-96'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
