import React from 'react';
import SeedProvider from '../../providers/SeedProvider';
import Seed from './index';

const NewTransactionWithProvider = () => {
  return (
    <SeedProvider>
      <Seed />
    </SeedProvider>
  );
};

export default NewTransactionWithProvider;
