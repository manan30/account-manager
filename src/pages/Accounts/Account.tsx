import React, { useEffect } from 'react';
import axios from 'redaxios';
import { useQuery } from 'react-query';
import { Account as AccountData } from '../../models/Account';
import { PLAID_GET_ACCOUNTS_BY_ACCESS_TOKEN } from '../../utils/Constants/APIConstants';

type AccountProps = {
  account: AccountData;
};

const Account: React.FC<AccountProps> = ({ account }) => {
  const { data, error, isLoading } = useQuery(account.itemId, async () => {
    const response = await axios.post<any>(
      `${PLAID_GET_ACCOUNTS_BY_ACCESS_TOKEN}`,
      {
        accessToken: account.accessToken
      }
    );
    return response.data;
  });

  useEffect(() => {
    console.log({ data, error, isLoading });
  }, [data, error, isLoading]);

  return <div></div>;
};

export default Account;
