import React from 'react';
import Notification from './Notification';
import { useNotificationStateContext } from '../../contexts/NotificationContext';

function NotificationManager() {
  const { notifications } = useNotificationStateContext();

  console.log({ notifications });

  return notifications.length !== 0 ? (
    <div className='fixed top-0 right-0 mr-8 mt-8'>
      {notifications.map((notification, id) => {
        return (
          <Notification id={id} theme={notification.theme}>
            {notification.content}
          </Notification>
        );
      })}
    </div>
  ) : null;
}
export default NotificationManager;
