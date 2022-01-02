import React, { useState } from 'react';
import cn from 'classnames';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { useQuery } from 'react-query';
import axios, { Response } from 'redaxios';
import { AccountResponse, AccountBalance } from '../../../../models/Account';
import { ACCOUNT_FUNCTIONS } from '../../../../utils/Constants/APIConstants';
import ModalFallback from '../../../../components/ModalFallback';
import Card from '../../../../components/Card';

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
      <Card className='flex flex-col space-y-3'>
        <p className='text-base font-semibold text-indigo-700 md:text-lg'>
          {account.name.split('-')[0].trim()}
        </p>
        <p className='text-xs capitalize md:text-sm'>
          Account Type: {account.subtype.split('_').join(' ')}
        </p>

        <p
          className={cn(
            'font-medium text-md text-indigo-500 text-xs md:text-sm',
            loadingAccountBalance && 'animate-pulse w-2/3'
          )}
        >
          Available Balance: ${accountBalance?.data.available}
        </p>
        <div className='flex items-center text-gray-500'>
          <div className='flex items-center space-x-2 text-xs md:text-sm'>
            <p>XXXX</p>
            <p>XXXX</p>
            <p>XXXX</p>
            <p>{account.last_four}</p>
          </div>
          <button
            className='p-1 ml-auto text-gray-700 rounded-full outline-none focus:ring-1 focus:ring-gray-500'
            onClick={() => setShowModal(true)}
          >
            <ArrowRightIcon className='w-5 h-5 text-gray-600' />
          </button>
        </div>
      </Card>
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
