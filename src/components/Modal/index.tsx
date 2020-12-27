import React from 'react';

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen = false, children }) => {
  return (
    <div className='fixed z-10 inset-0 overflow-y-auto grid place-items-center'>
      <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
      </div>
      <div
        className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full min-h-c-8'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
      >
        <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
