import React from 'react';
import { Helmet } from 'react-helmet';
import SeedProvider from '../../providers/SeedProvider';
import Seed from './Seed';

const SeedWithProvider = () => {
  return (
    <SeedProvider>
      <Helmet>
        <title>{`Account Manager - Seed`}</title>
        <meta name='title' content={`Account Manager - Seed`} />
        <meta property='og:title' content={`Account Manager - Seed`} />
        <meta property='twitter:title' content={`Account Manager - Seed`} />
      </Helmet>
      <Seed />
    </SeedProvider>
  );
};

export default SeedWithProvider;
