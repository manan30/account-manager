import React from 'react';
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
      )
  );

  return (
    <div className='shadow-md h-48 w-full bg-gray-50 rounded-lg p-6'>
      <p className='font-medium text-sm'>{accountDetails.name}</p>
      <p className='text-xs'>{accountDetails.last_four}</p>
      <p className='text-xs'>{accountDetails.subtype}</p>
    </div>
  );
};

export default AccountItem;
