import React from 'react';
import { Helmet } from 'react-helmet';

const Transaction = () => {
  return (
    <>
      <Helmet>
        <title>{`Account Manager - Transactions`}</title>
        <meta name='title' content={`Account Manager - Transactions`} />
        <meta property='og:title' content={`Account Manager - Transactions`} />
        <meta
          property='twitter:title'
          content={`Account Manager - Transactions`}
        />
      </Helmet>
    </>
  );
};

export default Transaction;
