import React from 'react';
import Modal from '../../components/Modal';

const Authentication = () => {
  return (
    <Modal isOpen={true} onCloseClickHandler={() => 'ABCD'}>
      Google
    </Modal>
  );
};

export default Authentication;
