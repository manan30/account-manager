import cn from 'classnames';
import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { useNotificationDispatchContext } from '../../contexts/NotificationContext';
import { REMOVE_NOTIFICATION } from '../../utils/Constants/ActionTypes/NotificationReducerActionTypes';
import {
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_SUCCESS,
  NOTIFICATION_THEME_WARNING
} from '../../utils/Constants/ThemeConstants';

type NotificationProps = {
  id: number;
  children: React.ReactNode;
  theme: string;
};

const Notification: React.FC<NotificationProps> = ({ id, children, theme }) => {
  const dispatch = useNotificationDispatchContext();

  return (
    <div
      className={cn(
        'w-notification-width rounded p-2 mb-4 animate-notification-entry',
        theme === NOTIFICATION_THEME_SUCCESS && 'bg-indigo-200 text-indigo-800',
        theme === NOTIFICATION_THEME_FAILURE && 'bg-red-200 text-red-800',
        theme === NOTIFICATION_THEME_WARNING && 'bg-yellow-200 text-yellow-800'
      )}
    >
      <div className='flex items-center'>
        <div className='flex-auto text-sm'>{children}</div>
        <button
          type='button'
          onClick={() =>
            dispatch({ type: REMOVE_NOTIFICATION, payload: { id } })
          }
        >
          <IoIosClose size={24} />
        </button>
      </div>
    </div>
  );
};

export default Notification;
