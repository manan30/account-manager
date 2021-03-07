import firebase from 'firebase';
import { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

type usePlaidLinkTokenProps = {
  linkToken: string | null;
  user: firebase.User | null | undefined;
};

const usePlaidAccessToken = ({ linkToken, user }: usePlaidLinkTokenProps) => {
  const onSuccess = useCallback(
    async (public_token) => {
      const response = await fetch(
        'http://localhost:5001/account-manager-41694/us-central1/accounts/plaid/set-access-token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ publicToken: public_token, userId: user?.uid })
        }
      );

      const data = await response.json();

      console.log({ set: data });
    },
    [user]
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken || '',
    onSuccess
  };

  const { open, ready } = usePlaidLink(config);

  return { open, ready };
};

export default usePlaidAccessToken;
