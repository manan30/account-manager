import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const Accounts = () => {
  const [linkToken, setLinkToken] = useState<null | string>(null);
  const onSuccess = React.useCallback(async (public_token, metadata) => {
    // send public_token to server
    const response = await fetch(
      'http://localhost:5001/account-manager-41694/us-central1/accounts/plaid/set-access-token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ public_token })
      }
    );

    const data = await response.json();

    console.log({ set: data });
    // Handle response ...
  }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken || '',
    onSuccess
  };
  const { open, ready } = usePlaidLink(config);

  const generateToken = async () => {
    const response = await fetch(
      'http://localhost:5001/account-manager-41694/us-central1/accounts/plaid/create-link-token',
      { method: 'POST' }
    );
    const data = await response.json();
    console.log({ data });
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    generateToken();
  }, []);

  return (
    <div>
      Accounts Page
      {linkToken && (
        <button onClick={() => open()} disabled={!ready}>
          Link account
        </button>
      )}
    </div>
  );
};

export default Accounts;
