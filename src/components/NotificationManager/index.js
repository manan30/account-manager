import React from 'react';
import Notification from './Notification';
import { useNotificationStateContext } from '../../contexts/NotificationContext';
import { NOTIFICATION_THEME_SUCCESS } from '../../utils/Constants/ThemeConstants';

function NotificationManager() {
  const { notifications } = useNotificationStateContext();

  return notifications.length !== 0 ? (
    <div className='fixed top-0 right-0 mr-8 mt-8'>
      {notifications.map((notification, id) => {
        const key = id;
        return (
          <Notification
            key={key}
            id={id}
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
