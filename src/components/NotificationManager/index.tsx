import React, { useEffect } from 'react';
import Notification from './Notification';
import {
  useNotificationDispatch,
  useNotificationStateContext
} from '../../providers/NotificationProvider';
import { NOTIFICATION_THEME_SUCCESS } from '../../utils/Constants/ThemeConstants';
import { REMOVE_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';

const NotificationManager = () => {
  const dispatch = useNotificationDispatch();
  const { notifications } = useNotificationStateContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (notifications && notifications.length) {
        const { id } = notifications[notifications.length - 1];
        dispatch({ type: REMOVE_NOTIFICATION, payload: { id } });
      }
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [notifications, dispatch]);

  return notifications.length !== 0 ? (
    <div className='fixed top-0 right-0 mt-8 mr-8'>
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
};
export default NotificationManager;
