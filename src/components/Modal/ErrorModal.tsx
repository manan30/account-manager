import React from 'react';
import { MdErrorOutline } from 'react-icons/md';
import Modal from './index';

type ErrorModalProps = {
  isOpen: boolean;
  message: string;
  closeModal: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  message,
  closeModal
}) => {
  return (
    <Modal isOpen={isOpen} onCloseClickHandler={closeModal}>
      <div className='flex items-center justify-center flex-col'>
        <div className='text-red-500 mb-4'>
          <MdErrorOutline size={72} />
        </div>
        <div className='text-center mb-4 text-sm'>{message}</div>
      </div>
    </Modal>
  );
};

export default ErrorModal;
