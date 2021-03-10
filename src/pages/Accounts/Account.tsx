import React, { useEffect } from 'react';
import axios from 'redaxios';
import { useQuery } from 'react-query';
import { PlaidItem } from '../../models/PlaidItem';
import { PLAID_GET_ACCOUNTS_BY_ACCESS_TOKEN } from '../../utils/Constants/APIConstants';
import { AccountsResponse } from 'plaid';
import AccountsLoading from './AccountsLoading';
import { NumberWithCommasFormatter } from '../../utils/Formatters';

type AccountProps = {
  plaidItem: PlaidItem;
};

const Account: React.FC<AccountProps> = ({ plaidItem }) => {
  const { data, error, isLoading, isFetching } = useQuery<
    AccountsResponse,
    Error
  >(plaidItem.itemId, async () => {
    const response = await axios.post<AccountsResponse>(
      `${PLAID_GET_ACCOUNTS_BY_ACCESS_TOKEN}`,
      {
        accessToken: plaidItem.accessToken
      }
    );
    return response.data;
  });

  if (isLoading || isFetching) {
    return <AccountsLoading />;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mx-16'>
      {data?.accounts.map((account) => {
        return (
          <div
            key={account.account_id}
            className='rounded-lg shadow-md w-full flex flex-col space-y-4 px-8 py-6'
          >
            <div className='font-semibold text-3xl'>{account.name}</div>
            <div className='font-thin text-xs'>Ending in {account.mask}</div>
            <div className='font-medium text-xl'>
              Available Balance: $
              {NumberWithCommasFormatter.format(
                `${account.balances.available}`
              )}
            </div>
            {account.balances.limit ?? (
              <div className='font-medium text-xl'>
                Account Limit: $
                {NumberWithCommasFormatter.format(`${account.balances.limit}`)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Account;
