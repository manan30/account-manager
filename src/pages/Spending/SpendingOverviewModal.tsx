import React from 'react';
import Modal from '../../components/Modal';

type SpendingOverviewModalProps = {
  handleModalClose: () => void;
};

const SpendingOverviewModal: React.FC<SpendingOverviewModalProps> = ({
  handleModalClose
}) => {
  return (
    <Modal isOpen onCloseClickHandler={handleModalClose}>
      <div className='flex justify-center mx-8'></div>
    </Modal>
  );
};

export default SpendingOverviewModal;
