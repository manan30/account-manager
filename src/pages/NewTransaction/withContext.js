import React from 'react';
import NewTransactionContextProvider from '../../contexts/NewTransactionContext';
import NewTransaction from './index';

export default () => {
  return (
    <NewTransactionContextProvider>
      <NewTransaction />
    </NewTransactionContextProvider>
  );
};
