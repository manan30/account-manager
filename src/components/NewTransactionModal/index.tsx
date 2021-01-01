import React from 'react';
import NewTransactionProvider from '../../providers/NewTransactionProvider';
import NewTransaction from './NewTransaction';

type NewTransactionModalWithProviderProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetchData: () => void;
  transactionEntity?: { name?: string; id?: string };
};

const NewTransactionModalWithProvider: React.FC<NewTransactionModalWithProviderProps> = ({
  showModal,
  transactionEntity,
  setShowModal,
  refetchData
}) => {
  return (
    <NewTransactionProvider>
      <NewTransaction
        transactionEntity={transactionEntity}
        showModal={showModal}
        setShowModal={setShowModal}
        refetchData={refetchData}
      />
    </NewTransactionProvider>
  );
};

export default NewTransactionModalWithProvider;
