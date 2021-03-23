import React from 'react';
import cn from 'classnames';
import { MdArrowForward } from 'react-icons/md';
import { useQuery } from 'react-query';
import axios, { Response } from 'redaxios';
import { AccountResponse, AccountBalance } from '../../models/Account';
import { ACCOUNT_FUNCTIONS } from '../../utils/Constants/APIConstants';

type AccountItemsProps = {
  accountDetails: AccountResponse;
  accessToken: string;
};

const AccountItem: React.FC<AccountItemsProps> = ({
  accountDetails,
  accessToken
}) => {
  const { data: accountBalance, isLoading: loadingAccountBalance } = useQuery<
    Response<AccountBalance>,
    Response<Error>
  >(
    accountDetails.id,
    async () =>
      await axios.get<AccountBalance>(
        `${ACCOUNT_FUNCTIONS}/balances/${accessToken}/${accountDetails.id}`
      ),
    { staleTime: 600000 }
  );

  return (
    <div className='shadow-md h-48 w-full bg-gray-50 rounded-lg p-6 flex flex-col'>
      <p className='font-semibold text-lg text-indigo-700'>
        {accountDetails.name.split('-')[0].trim()}
      </p>
      <p className='mt-3 text-sm capitalize'>
        Account Type: {accountDetails.subtype.split('_').join(' ')}
      </p>
      <div className='flex flex-col mt-auto space-y-2 -mb-2'>
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
            <p className='text-sm'>{accountDetails.last_four}</p>
          </div>
          <button className='ml-auto text-gray-700 rounded-full p-2 hover:bg-gray-200 outline-none'>
            <MdArrowForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountItem;
