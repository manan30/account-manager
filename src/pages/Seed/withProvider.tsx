import React from 'react';
import SeedProvider from '../../providers/SeedProvider';
import Seed from './index';

const SeedWithProvider = () => {
  return (
    <SeedProvider>
      <Seed />
    </SeedProvider>
  );
};

export default SeedWithProvider;
