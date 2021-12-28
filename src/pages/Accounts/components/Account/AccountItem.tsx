import React, { useState } from 'react';
import cn from 'classnames';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { useQuery } from 'react-query';
import axios, { Response } from 'redaxios';
import { AccountResponse, AccountBalance } from '../../../../models/Account';
import { ACCOUNT_FUNCTIONS } from '../../../../utils/Constants/APIConstants';
import ModalFallback from '../../../../components/ModalFallback';

const TransactionsModal = React.lazy(() => import('../TransactionsModal'));

type AccountItemsProps = {
  account: AccountResponse;
  accessToken: string;
};

const AccountItem: React.FC<AccountItemsProps> = ({ account, accessToken }) => {
  const [showModal, setShowModal] = useState(false);

  const { data: accountBalance, isLoading: loadingAccountBalance } = useQuery<
    Response<AccountBalance>,
    Response<Error>
  >(
    [account.id, accessToken, 'balance'],
    async () =>
      await axios.get<AccountBalance>(
        `${ACCOUNT_FUNCTIONS}/balances/${accessToken}/${account.id}`
      ),
    { staleTime: 600000 }
  );

  return (
    <>
      <div className='shadow-md h-48 w-full bg-gray-50 rounded-lg p-6 flex flex-col'>
        <p className='font-semibold text-lg text-indigo-700 mb-2'>
          {account.name.split('-')[0].trim()}
        </p>
        <p className='text-sm capitalize mb-2'>
          Account Type: {account.subtype.split('_').join(' ')}
        </p>
        <div className='flex flex-col mt-auto -mb-2'>
          <p
            className={cn(
              'font-medium text-md text-indigo-500',
              loadingAccountBalance && 'animate-pulse w-2/3'
            )}
          >
            Available Balance: ${accountBalance?.data.available}
          </p>
          <div className='flex items-center text-gray-500'>
            <div className='flex items-center space-x-2'>
              <p className='text-sm'>XXXX</p>
              <p className='text-sm'>XXXX</p>
              <p className='text-sm'>XXXX</p>
              <p className='text-sm'>{account.last_four}</p>
            </div>
            <button
              className='ml-auto text-gray-700 rounded-full p-2 hover:bg-gray-200 outline-none'
              onClick={() => setShowModal(true)}
            >
              <ArrowRightIcon className='h-5 w-5 text-gray-600' />
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <TransactionsModal
            accessToken={accessToken}
            accountId={account.id}
            onModalCloseHandler={() => setShowModal(false)}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default AccountItem;
