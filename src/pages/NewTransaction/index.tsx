import React from 'react';
import NewTransactionProvider from '../../providers/NewTransactionProvider';
import NewTransaction from './NewTransaction';

const NewTransactionWithProvider = () => {
  return (
    <NewTransactionProvider>
      <NewTransaction />
    </NewTransactionProvider>
  );
};

export default NewTransactionWithProvider;
