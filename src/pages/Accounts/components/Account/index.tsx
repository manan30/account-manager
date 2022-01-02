import React from 'react';
import { useQuery } from 'react-query';
import axios, { Response } from 'redaxios';
import {
  Account as AccountModel,
  AccountResponse
} from '../../../../models/Account';
import { useNotificationDispatch } from '../../../../providers/NotificationProvider';
import { ACCOUNT_FUNCTIONS } from '../../../../utils/Constants/APIConstants';
import { NOTIFICATION_THEME_FAILURE } from '../../../../utils/Constants/ThemeConstants';
import AccountItem from './AccountItem';
import AccountsLoading from './AccountsLoading';

type AccountProps = {
  account: AccountModel;
};

const Account: React.FC<AccountProps> = ({ account }) => {
  const notificationDispatch = useNotificationDispatch();
  const {
    data: accountResponse,
    isLoading: loadingAccount,
    isFetching: fetchingAccount
  } = useQuery<Response<AccountResponse[]>, Response<Error>>(
    account.id,
    async () =>
      await axios.get<AccountResponse[]>(
        `${ACCOUNT_FUNCTIONS}/${account.accessToken}`
      ),
    {
      onError: (accountError) => {
        notificationDispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            content: `Request failed due to ${accountError.statusText}`,
            theme: NOTIFICATION_THEME_FAILURE
          }
        });
      }
    }
  );

  return (
    <div>
      <p className='text-xl font-bold text-gray-600 md:text-2xl'>
        {account.institutionName}
      </p>
      {(loadingAccount || fetchingAccount) && (
        <div className='mt-6'>
          <AccountsLoading />
        </div>
      )}
      {accountResponse?.data && (
        <div className='grid grid-cols-1 gap-6 mt-6 mb-8 md:gap-8 md:grid-cols-2'>
          {accountResponse.data.map((accountItem) => (
            <AccountItem
              key={accountItem.id}
              account={accountItem}
              accessToken={account.accessToken}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Account;
