import React from 'react';
import NewTransactionProvider from '../../contexts/NewTransactionContext';
import NewTransaction from './index';

export default () => {
  return (
    <NewTransactionProvider>
      <NewTransaction />
    </NewTransactionProvider>
  );
};
