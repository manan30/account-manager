import React, { useEffect } from 'react';
import axios from 'redaxios';
import cn from 'classnames';
import Button from '../../components/Button';
import { useTellerConnect } from '../../hooks/useTellerConnect';
import { useMutation } from 'react-query';
import { Response } from 'redaxios';
import { ACCOUNT_FUNCTIONS } from '../../utils/Constants/APIConstants';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import Loader from '../../components/Loader';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';

const LinkAccount = () => {
  const notificationDispatch = useNotificationDispatchContext();
  const { user } = useGlobalState();
  const {
    enrollment,
    initializing,
    openTellerConnect,
    enrollmentCompleted
  } = useTellerConnect();

  const {
    isLoading: addingAccount,
    error: accountAddingError,
    mutate: addNewAccountMutation
  } = useMutation<Response<Account>, Response<Error>>(
    async () =>
      await axios.post<Account>(`${ACCOUNT_FUNCTIONS}/add-account`, {
        ...enrollment,
        userId: user?.uid
      }),
    {
      mutationKey: enrollment?.enrollment.id
    }
  );

  useEffect(() => {
    if (enrollment?.accessToken) {
      addNewAccountMutation();
      enrollmentCompleted();
    }
  }, [enrollment, addNewAccountMutation, enrollmentCompleted]);

  useEffect(() => {
    if (accountAddingError) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: `Request failed due to ${accountAddingError.data}`,
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    }
  }, [accountAddingError, notificationDispatch]);

  return (
    <Button
      disabled={initializing || addingAccount}
      className={cn(
        'w-auto px-4 py-3 bg-indigo-600 hover:shadow-md',
        (initializing || addingAccount) &&
          'hover:shadow-none opacity-40 cursor-default'
      )}
      onClickHandler={() => {
        if (openTellerConnect) openTellerConnect();
      }}
    >
      <div className='flex items-center space-x-4 whitespace-nowrap'>
        {(initializing || addingAccount) && <Loader color='text-gray-100' />}
        <p>Link Account</p>
      </div>
    </Button>
  );
};

export default LinkAccount;
