import firebase from 'firebase';
import axios from 'redaxios';
import { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { TokenResponse } from 'plaid';
import { PLAID_SET_ACCESS_TOKEN_ENDPOINT } from '../../utils/Constants/APIConstants';

type usePlaidLinkTokenProps = {
  linkToken: string | null;
  user: firebase.User | null | undefined;
};

const usePlaidAccessToken = ({ linkToken, user }: usePlaidLinkTokenProps) => {
  const [tokenResponse, setTokenResponse] = useState<
    TokenResponse | undefined
  >();

  const onSuccess = useCallback(
    async (public_token) => {
      const response = await axios.post<TokenResponse>(
        PLAID_SET_ACCESS_TOKEN_ENDPOINT,
        {
          publicToken: public_token,
          userId: user?.uid
        }
      );

      const { data } = response;

      setTokenResponse(data);
    },
    [user]
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken || '',
    onSuccess
  };

  const { open, ready } = usePlaidLink(config);

  return { open, ready, tokenResponse };
};

export default usePlaidAccessToken;
