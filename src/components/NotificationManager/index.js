import React from 'react';
import { useNotificationStateContext } from '../../contexts/NotificationContext';

function Notification() {
  const { notifications } = useNotificationStateContext();

  return notifications.length !== 0 ? (
    <div className='fixed top-0 right-0 mr-8 mt-8 bg-green-500 rounded'>
      {notifications.map((notification, id) => {
        return <div>{notification.content}</div>;
      })}
    </div>
  ) : null;
}
export default Notification;
