import React from 'react';
import Modal from '../../components/Modal';
import NewTransactionProvider from '../../providers/NewTransactionProvider';
import NewTransaction from './NewTransaction';

const NewTransactionWithProvider = () => {
  return (
    <Modal isOpen={true} onCloseClickHandler={() => 'ABCD'}>
      <NewTransactionProvider>
        <NewTransaction />
      </NewTransactionProvider>
    </Modal>
  );
};

export default NewTransactionWithProvider;
