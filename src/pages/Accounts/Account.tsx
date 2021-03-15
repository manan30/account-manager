import React from 'react';
import axios, { Response } from 'redaxios';
import { useQuery } from 'react-query';
import { AccountsResponse } from 'plaid';
import AccountsLoading from './AccountsLoading';
import { NumberWithCommasFormatter } from '../../utils/Formatters';
import { MdArrowForward } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';

type AccountProps = {
  plaidItem: PlaidItem;
};

const Account: React.FC<AccountProps> = ({ plaidItem }) => {
  const notificationDispatch = useNotificationDispatchContext();
  const { data, isLoading, isFetching, error } = useQuery<
    AccountsResponse,
    Response<Error>
  >(plaidItem.itemId, async () => {
    const response = await axios.post<AccountsResponse>(
      `${PLAID_GET_ACCOUNTS_BY_ACCESS_TOKEN}`,
      {
        accessToken: plaidItem.accessToken
      }
    );
    return response.data;
  });

  if (error) {
    notificationDispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        content: `Request failed due to ${error.statusText}`,
        theme: NOTIFICATION_THEME_FAILURE
      }
    });
  }

  if (isLoading || isFetching) {
    return <AccountsLoading />;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mx-16 mb-16'>
      {data?.accounts.map((account) => {
        return (
          <div
            key={account.account_id}
            className='rounded-lg shadow-md w-full flex flex-col px-8 py-6 h-48 bg-gradient-to-r from-green-400 to-blue-700 text-gray-50'
          >
            <div className='font-semibold text-2xl mb-4'>{account.name}</div>
            <div className='flex items-center justify-between mb-2'>
              <div className='font-medium'>
                Available Balance: $
                {NumberWithCommasFormatter.format(
                  `${account.balances.available}`
                )}
              </div>
              {account.balances.limit && (
                <div className='font-medium'>
                  Account Limit: $
                  {NumberWithCommasFormatter.format(
                    `${account.balances.limit}`
                  )}
                </div>
              )}
            </div>
            <div className='text-sm flex items-center mt-auto w-full'>
              <span>Ending in {account.mask}</span>
              <Link to='/' className='ml-auto'>
                <MdArrowForward size={24} />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Account;
