import React from 'react';
import Modal from '../../components/Modal';
import { MdErrorOutline } from 'react-icons/md';

const UnauthorizedUserModal = () => {
  return (
    <Modal
      isOpen
      onCloseClickHandler={() => {
        return;
      }}
      hideCancelButton
    >
      <div className='flex items-center justify-center'>
        <div className='text-red-500'>
          <MdErrorOutline size={72} />
        </div>
      </div>
    </Modal>
  );
};

export default UnauthorizedUserModal;
