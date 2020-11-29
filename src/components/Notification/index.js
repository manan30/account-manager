import React from 'react';
import { useNotificationStateContext } from '../../contexts/NotificationContext';

function Notification() {
  const { showNotification, content, theme } = useNotificationStateContext();

  return showNotification ? (
    <div className='fixed top-0 right-0 mr-8 mt-8 bg-green-500 rounded'>
      {content}
    </div>
  ) : null;
}
export default Notification;
