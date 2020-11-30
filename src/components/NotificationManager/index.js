import React, { useEffect } from 'react';
import Notification from './Notification';
import {
  useNotificationDispatchContext,
  useNotificationStateContext
} from '../../contexts/NotificationContext';
import { NOTIFICATION_THEME_SUCCESS } from '../../utils/Constants/ThemeConstants';
import { REMOVE_NOTIFICATION } from '../../utils/Constants/ActionTypes/NotificationReducerActionTypes';

function NotificationManager() {
  const dispatch = useNotificationDispatchContext();
  const { notifications } = useNotificationStateContext();

  useEffect(() => {
    const interval = setInterval(() => {
      if (notifications && notifications.length) {
        const { id } = notifications[notifications.length - 1];
        dispatch({ type: REMOVE_NOTIFICATION, payload: id });
      }
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [notifications, dispatch]);

  return notifications.length !== 0 ? (
    <div className='fixed top-0 right-0 mr-8 mt-8'>
      {notifications.map((notification, id) => {
        const key = id;
        return (
          <Notification
            key={key}
            id={notification.id}
            theme={notification.theme || NOTIFICATION_THEME_SUCCESS}
          >
            {notification.content}
          </Notification>
        );
      })}
    </div>
  ) : null;
}
export default NotificationManager;
