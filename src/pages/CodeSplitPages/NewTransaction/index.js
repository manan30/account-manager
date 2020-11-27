import React from 'react';
import NewTransactionContextProvider from '../../../contexts/NewTransactionContext';
import NewTransactionPage from '../../NewTransaction';

function NewTransaction() {
  return (
    <NewTransactionContextProvider>
      <NewTransactionPage />
    </NewTransactionContextProvider>
  );
}

export default NewTransaction;
