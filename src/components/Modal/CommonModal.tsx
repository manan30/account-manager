import React from 'react';
import { MdErrorOutline } from 'react-icons/md';
import Modal from './index';

export type CommonModalTypes = 'ERROR' | 'CONFIRM';

type CommonModalProps = {
  isOpen: boolean;
  message: string;
  type: CommonModalTypes;
  onClickConfirm?: () => void;
  closeModal: () => void;
};

const CommonModalProps: React.FC<CommonModalProps> = ({
  isOpen,
  message,
  type,
  onClickConfirm,
  closeModal
}) => {
  return (
    <Modal isOpen={isOpen} onCloseClickHandler={closeModal}>
      <div className='flex items-center justify-center flex-col'>
        {type === 'ERROR' && (
          <div className='text-red-500 mb-4'>
            <MdErrorOutline size={72} />
          </div>
        )}
        <div className='text-center mb-4 text-sm'>{message}</div>
      </div>
    </Modal>
  );
};

export default CommonModalProps;
