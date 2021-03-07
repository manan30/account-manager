import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import { ReactComponent as VaultIcon } from '../../assets/svg/vault.svg';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import usePlaidAccessToken from '../../hooks/Plaid/usePlaidAccessToken';
import axios from 'redaxios';
import { CreateLinkTokenResponse } from 'plaid';
import { PLAID_CREATE_LINK_TOKEN_ENDPOINT } from '../../utils/Constants/APIConstants';

const Accounts = () => {
  const [linkToken, setLinkToken] = useState<null | string>(null);
  const { user } = useGlobalState();
  const { open, ready } = usePlaidAccessToken({ linkToken, user });

  const generateToken = useCallback(async () => {
    const response = await axios.post<CreateLinkTokenResponse>(
      PLAID_CREATE_LINK_TOKEN_ENDPOINT,
      {
        userId: user?.uid
      }
    );
    const { data } = response;
    setLinkToken(data.link_token);
  }, [user]);

  useEffect(() => {
    if (user) {
      generateToken();
    }
  }, [user, generateToken]);

  return (
    <div className='h-full w-full flex flex-col items-center justify-center space-y-4'>
      <div className='h-96 w-96 rounded-full bg-indigo-100 grid place-items-center'>
        <VaultIcon height={220} width={220} />
      </div>
      <p>It looks like you have not linked any accounts yet</p>
      <p>Let&apos;s get started by linking an account</p>
      <Button
        disabled={!ready || !linkToken}
        className={cn(
          'w-auto px-4 py-3 bg-indigo-600 hover:shadow-md',
          (!ready || !linkToken) &&
            'hover:shadow-none opacity-40 cursor-default'
        )}
        onClickHandler={() => {
          open();
        }}
      >
        <div className='flex items-center space-x-4 whitespace-nowrap'>
          <p>Link Account</p>
          {(!ready || !linkToken) && <Loader color='text-gray-100' />}
        </div>
      </Button>
    </div>
  );
};

export default Accounts;
