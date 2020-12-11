import React from 'react';
import NewTransactionProvider from '../../providers/NewTransactionProvider';
import NewTransaction from './index';

export default () => {
  return (
    <NewTransactionProvider>
      <NewTransaction />
    </NewTransactionProvider>
  );
};
