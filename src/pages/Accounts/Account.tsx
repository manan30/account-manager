import { AccountsResponse } from 'plaid';
import React from 'react';
import { useQuery } from 'react-query';
import axios, { Response } from 'redaxios';
import { Account as AccountModel } from '../../models/Account';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import { ACCOUNT_FUNCTIONS } from '../../utils/Constants/APIConstants';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import AccountsLoading from './AccountsLoading';

type AccountProps = {
  account: AccountModel;
};

const Account: React.FC<AccountProps> = ({ account }) => {
  const notificationDispatch = useNotificationDispatchContext();
  const {
    data: accountResponse,
    isLoading: loadingAccount,
    isFetching: fetchingAccount,
    error: accountError
  } = useQuery<Response<AccountsResponse>, Response<Error>>(
    account.id,
    async () =>
      await axios.get(`${ACCOUNT_FUNCTIONS}/get-account/${account.accessToken}`)
  );

  if (accountError) {
    notificationDispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        content: `Request failed due to ${accountError.statusText}`,
        theme: NOTIFICATION_THEME_FAILURE
      }
    });
  }

  return (
    <div>
      <p className='text-3xl font-bold'>{account.institutionName}</p>
      <div className='mt-6'>
        {(loadingAccount || fetchingAccount) && <AccountsLoading />}
      </div>
    </div>
  );
};

export default Account;
