import React from 'react';
import { ReactComponent as VaultIcon } from '../../assets/svg/vault.svg';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import { Account as AccountModel } from '../../models/Account';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import Account from './components/Account';
import LinkAccount from './components/LinkAccount';

const Accounts = () => {
  const { user } = useGlobalState();
  const {
    data: accountsData,
    isLoading: loadingAccounts
  } = useFirestoreReadQuery<AccountModel>({
    collection: 'account',
    whereClauses: [['userId', '==', user?.uid]]
  });

  if (!loadingAccounts && (!accountsData || accountsData.length === 0)) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full space-y-4'>
        <div className='grid bg-indigo-100 rounded-full h-96 w-96 place-items-center'>
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
      <div className='flex justify-end mt-10 mb-8 md:mt-16'>
        <LinkAccount />
      </div>
      <div className='flex flex-col space-y-6'>
        {accountsData.map((account) => (
          <Account key={account.id} account={account} />
        ))}
      </div>
    </>
  ) : null;
};

export default Accounts;
