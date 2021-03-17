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
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import LinkAccount from './LinkAccount';
import AccountsLoading from './AccountsLoading';

const Accounts = () => {
  const {
    data: accountsData,
    error: accountsFetchingError,
    isLoading: loadingAccounts
  } = useFirestoreReadQuery<Account>({
    collection: 'account'
  });

  useEffect(() => {
    console.log({ accountsData });
  }, [accountsData]);

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

  // if (loadingAccounts) return <AccountsLoading />;

  if (!loadingAccounts && (!accountsData || accountsData.length === 0)) {
    return (
      <div className='h-full w-full flex flex-col items-center justify-center space-y-4'>
        <div className='h-96 w-96 rounded-full bg-indigo-100 grid place-items-center'>
          <VaultIcon height={220} width={220} />
        </div>
        <p>It looks like you have not linked any accounts yet</p>
        <p>Let&apos;s get started by linking an account</p>
        <LinkAccount />
      </div>
    );
  }

  return accountsData ? (
    <>
      <div className='my-12 flex justify-end mr-16'>
        <LinkAccount />
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
