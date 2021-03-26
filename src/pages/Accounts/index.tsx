import React from 'react';
import { ReactComponent as VaultIcon } from '../../assets/svg/vault.svg';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import { Account as AccountModel } from '../../models/Account';
import Account from './Account';
import LinkAccount from './LinkAccount';

const Accounts = () => {
  const {
    data: accountsData,
    // error: accountsFetchingError,
    isLoading: loadingAccounts
  } = useFirestoreReadQuery<AccountModel>({
    collection: 'account'
  });

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
    <div className='mx-16'>
      <div className='my-12 flex justify-end'>
        <LinkAccount />
      </div>
      <div className='mt-6 flex flex-col space-y-6'>
        {accountsData.map((account) => (
          <Account key={account.id} account={account} />
        ))}
      </div>
    </div>
  ) : null;
};

export default Accounts;
