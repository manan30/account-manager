import React from 'react';
import SeedProvider from '../../providers/SeedProvider';
import Seed from './Seed';

const SeedWithProvider = () => {
  return (
    <SeedProvider>
      <Seed />
    </SeedProvider>
  );
};

export default SeedWithProvider;
