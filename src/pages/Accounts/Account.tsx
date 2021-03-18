import React from 'react';
import { Account as AccountModel } from '../../models/Account';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';

type AccountProps = {
  account: AccountModel;
};

const Account: React.FC<AccountProps> = ({ account }) => {
  const notificationDispatch = useNotificationDispatchContext();

  // if (error) {
  //   notificationDispatch({
  //     type: 'ADD_NOTIFICATION',
  //     payload: {
  //       content: `Request failed due to ${error.statusText}`,
  //       theme: NOTIFICATION_THEME_FAILURE
  //     }
  //   });
  // }

  // if (isLoading || isFetching) {
  //   return <AccountsLoading />;
  // }

  return (
    <div>
      <p className='text-3xl font-bold'>{account.institutionName}</p>
    </div>
  );
};

export default Account;
