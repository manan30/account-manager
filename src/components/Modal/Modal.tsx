import React from 'react';
import { XIcon } from '@heroicons/react/solid';

type ModalProps = {
  title: string;
};

const Modal: React.FC<ModalProps> = ({ title, children }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-700'>
      <div className='w-full p-4 bg-gray-100 rounded-md sm:w-2/4 lg:w-4/12'>
        <div className='flex items-center mb-6'>
          <div className='text-lg font-semibold tracking-wide text-gray-800'>
            {title}
          </div>
          <button className='ml-auto'>
            <XIcon className='w-6 h-6 text-gray-700' />
          </button>
        </div>
        <div className='overflow-y-auto max-h-96'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
