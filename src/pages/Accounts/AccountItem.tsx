import React from 'react';
import { useQuery } from 'react-query';
import axios from 'redaxios';
import { AccountsResponse } from '../../models/Account';
import { ACCOUNT_FUNCTIONS } from '../../utils/Constants/APIConstants';

type AccountItemsProps = {
  accountDetails: AccountsResponse;
};

const AccountItem: React.FC<AccountItemsProps> = ({ accountDetails }) => {
  return (
    <div className='shadow-md h-48 w-full bg-gray-50 rounded-lg p-6'>
      <p className='font-medium text-sm'>{accountDetails.name}</p>
      <p className='text-xs'>{accountDetails.last_four}</p>
      <p className='text-xs'>{accountDetails.subtype}</p>
    </div>
  );
};

export default AccountItem;
