import React, { useEffect } from 'react';
import cn from 'classnames';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import { ReactComponent as VaultIcon } from '../../assets/svg/vault.svg';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import axios, { Response } from 'redaxios';
// import { useQuery } from 'react-query';
// import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
// import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
// import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
// import AccountsLoading from './AccountsLoading';
// import Account from './Account';
import { ACCOUNT_FUNCTIONS } from '../../utils/Constants/APIConstants';
import { useTellerConnect } from '../../hooks/useTellerConnect';
import { useMutation } from 'react-query';
import { Account } from '../../models/Account';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';

const Accounts = () => {
  const notificationDispatch = useNotificationDispatchContext();
  const { user } = useGlobalState();
  const {
    enrollment,
    initializing,
    openTellerConnect,
    enrollmentCompleted
  } = useTellerConnect();
  const {
    data,
    isLoading: addingAccount,
    error: accountAddingError,
    mutate: addNewAccountMutation
  } = useMutation<Response<Account>, Response<Error>>(
    async () =>
      await axios.post<Account>(`${ACCOUNT_FUNCTIONS}/add-account`, {
        ...enrollment,
        userId: user?.uid
      }),
    {
      mutationKey: enrollment?.enrollment.id
    }
  );

  useEffect(() => {
    if (accountAddingError) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: `Failed to add account. Request failed due to ${accountAddingError.statusText}`,
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    }
  }, [accountAddingError, notificationDispatch]);

  // if (plaidItemsFetchError) {
  //   notificationDispatch({
  //     type: 'ADD_NOTIFICATION',
  //     payload: {
  //       content: 'Something went wrong while fetching the accounts',
  //       theme: NOTIFICATION_THEME_FAILURE
  //     }
  //   });
  // }

  // const fetchAccounts = useCallback(async () => {
  //   try {
  //     const res = await axios.get(
  //       `${ACCOUNT_FUNCTIONS}/teller-account/${enrollment?.accessToken}`
  //     );
  //     console.log({ res });
  //   } catch (e) {
  //     console.log({ e });
  //   }
  // }, [enrollment]);

  useEffect(() => {
    if (enrollment?.accessToken) {
      addNewAccountMutation();
      enrollmentCompleted();
    }
  }, [enrollment, addNewAccountMutation, enrollmentCompleted]);

  // if (loadingAccounts) return <AccountsLoading />;

  if (!enrollment) {
    return (
      <div className='h-full w-full flex flex-col items-center justify-center space-y-4'>
        <div className='h-96 w-96 rounded-full bg-indigo-100 grid place-items-center'>
          <VaultIcon height={220} width={220} />
        </div>
        <p>It looks like you have not linked any accounts yet</p>
        <p>Let&apos;s get started by linking an account</p>
        <Button
          disabled={initializing || addingAccount}
          className={cn(
            'w-auto px-4 py-3 bg-indigo-600 hover:shadow-md',
            (initializing || addingAccount) &&
              'hover:shadow-none opacity-40 cursor-default'
          )}
          onClickHandler={() => {
            if (openTellerConnect) openTellerConnect();
          }}
        >
          <div className='flex items-center space-x-4 whitespace-nowrap'>
            {(initializing || addingAccount) && (
              <Loader color='text-gray-100' />
            )}
            <p>Link Account</p>
          </div>
        </Button>
      </div>
    );
  }

  return enrollment ? (
    <>
      <div className='my-12 flex justify-end mr-16'>
        <Button
          disabled={initializing}
          className={cn(
            'w-auto px-4 py-3 bg-indigo-600 hover:shadow-md',
            initializing && 'hover:shadow-none opacity-40 cursor-default'
          )}
          onClickHandler={() => {
            console.log('Hello');
            if (openTellerConnect) openTellerConnect();
          }}
        >
          <div className='flex items-center space-x-4 whitespace-nowrap'>
            {initializing && <Loader color='text-gray-100' />}
            <p>Link Account</p>
          </div>
        </Button>
      </div>
      {/* <div className='w-full'>
        {plaidItems?.map((account) => (
          <Account key={account.id} plaidItem={account} />
        ))}
      </div> */}
    </>
  ) : null;
};

export default Accounts;
