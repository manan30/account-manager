import React from 'react';
import { PlaidLink } from 'react-plaid-link';

const Accounts = () => {
  return (
    <div>
      Accounts Page
      <PlaidLink
        onSuccess={(props) => {
          console.log({ props });
        }}
      />
    </div>
  );
};

export default Accounts;
