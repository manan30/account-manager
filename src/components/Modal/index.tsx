import React from 'react';

type ModalProps = {
  isOpen: boolean;
  modalTitle: string;
  children: React.ReactNode;
  modalVisibilityHandler: () => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  modalTitle,
  children,
  modalVisibilityHandler
}) => {
  return isOpen ? (
    <div className='fixed z-10 inset-0 overflow-y-auto grid place-items-center'>
      <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
      </div>
      <div
        className='bg-white rounded-lg text-left overflow-hidden overflow-y-auto shadow-xl transform transition-all w-full max-w-lg min-h-c-8 max-h-table'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
      >
        <div className='bg-white p-4 sm:p-6'>
          <div className='text-xl text-indigo-600 tracking-wide font-bold mb-3'>
            {modalTitle}
          </div>
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
