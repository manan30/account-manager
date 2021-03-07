import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import { ReactComponent as VaultIcon } from '../../assets/svg/vault.svg';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import usePlaidAccessToken from '../../hooks/Plaid/usePlaidAccessToken';
import axios, { Response } from 'redaxios';
import { CreateLinkTokenResponse } from 'plaid';
import { PLAID_CREATE_LINK_TOKEN_ENDPOINT } from '../../utils/Constants/APIConstants';
import { useQuery } from 'react-query';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';

const Accounts = () => {
  const notificationDispatch = useNotificationDispatchContext();
  const { user } = useGlobalState();
  const [linkToken, setLinkToken] = useState<null | string>(null);
  const { open, ready } = usePlaidAccessToken({ linkToken, user });
  const { error } = useQuery<
    CreateLinkTokenResponse | undefined,
    Response<Error>
  >(
    [user?.uid],
    async () => {
      if (user) {
        const response = await axios.post<CreateLinkTokenResponse>(
          `${PLAID_CREATE_LINK_TOKEN_ENDPOINT}`,
          {
            userId: user?.uid
          }
        );
        return response.data;
      }
    },
    {
      onSuccess: (data) => {
        setLinkToken((data as CreateLinkTokenResponse).link_token);
      },
      retry: 2
    }
  );

  useEffect(() => {
    if (error) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: `Request failed due to ${error.status} : ${error.statusText} error`,
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    }
  }, [error, notificationDispatch]);

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
