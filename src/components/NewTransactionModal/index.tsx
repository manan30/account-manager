import React from 'react';
import NewTransactionProvider from '../../providers/NewTransactionProvider';
import NewTransaction from './NewTransaction';

type NewTransactionModalWithProviderProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  transactionEntity?: { name?: string; id?: string };
};

const NewTransactionModalWithProvider: React.FC<NewTransactionModalWithProviderProps> = ({
  showModal,
  transactionEntity,
  setShowModal
}) => {
  return (
    <NewTransactionProvider>
      <NewTransaction
        transactionEntity={transactionEntity}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </NewTransactionProvider>
  );
};

export default NewTransactionModalWithProvider;
