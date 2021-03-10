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
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import AccountLoadingCard from './AccountsLoading';
import AccountsLoading from './AccountsLoading';
import Account from './Account';
import { PlaidItem as AccountData } from '../../models/PlaidItem';

const Accounts = () => {
  const notificationDispatch = useNotificationDispatchContext();
  const { user } = useGlobalState();
  const [linkToken, setLinkToken] = useState<null | string>(null);
  const {
    data: plaidItems,
    error: plaidItemsFetchError,
    isLoading: loadingAccounts
  } = useFirestoreReadQuery<AccountData>({
    collection: 'account',
    whereClauses: [['userID', '==', user?.uid]]
  });
  const { open, ready, error: plaidLinkError } = usePlaidAccessToken({
    linkToken,
    user
  });
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

  if (loadingAccounts) return <AccountsLoading />;

  if (plaidItems && plaidItems.length === 0) {
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
            {(!ready || !linkToken) && <Loader color='text-gray-100' />}
            <p>Link Account</p>
          </div>
        </Button>
      </div>
    );
  }

  return plaidItems ? (
    <>
      <div className='my-12 flex justify-end mr-16'>
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
            {(!ready || !linkToken) && <Loader color='text-gray-100' />}
            <p>Link Account</p>
          </div>
        </Button>
      </div>
      <div className='w-full'>
        {plaidItems?.map((account) => (
          <Account key={account.id} plaidItem={account} />
        ))}
      </div>
    </>
  ) : null;
};

export default Accounts;
