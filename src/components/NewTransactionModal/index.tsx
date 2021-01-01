import React from 'react';
import Modal from '../Modal';
import NewTransactionProvider from '../../providers/NewTransactionProvider';
import NewTransaction from './NewTransaction';

type NewTransactionModalWithProviderProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetchData: () => void;
};

const NewTransactionModalWithProvider: React.FC<NewTransactionModalWithProviderProps> = ({
  showModal,
  setShowModal
}) => {
  return (
    <Modal isOpen={showModal} onCloseClickHandler={() => setShowModal(false)}>
      <NewTransactionProvider>
        <NewTransaction />
      </NewTransactionProvider>
    </Modal>
  );
};

export default NewTransactionModalWithProvider;
