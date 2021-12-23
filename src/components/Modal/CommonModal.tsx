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

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  message,
  type,
  closeModal
}) => {
  return (
    <Modal isOpen={isOpen} onCloseClickHandler={closeModal}>
      <div className='flex flex-col items-center justify-center'>
        {type === 'ERROR' && (
          <div className='mb-4 text-red-500'>
            <MdErrorOutline size={72} />
          </div>
        )}
        <div className='mb-4 text-sm text-center'>{message}</div>
      </div>
    </Modal>
  );
};

export default CommonModal;
