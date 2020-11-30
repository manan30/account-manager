import React, { useEffect, useState } from 'react';
import Notification from './Notification';
import {
  useNotificationDispatchContext,
  useNotificationStateContext
} from '../../contexts/NotificationContext';
import { NOTIFICATION_THEME_SUCCESS } from '../../utils/Constants/ThemeConstants';
import { REMOVE_NOTIFICATION } from '../../utils/Constants/ActionTypes/NotificationReducerActionTypes';

function NotificationManager() {
  // const dispatch = useNotificationDispatchContext();
  const { notifications } = useNotificationStateContext();
  // const [notificationHidden, setNotificationHidden] = useState(false);

  // useEffect(() => {
  //   console.log({ notifications });
  // }, [notifications]);

  return notifications.length !== 0 ? (
    <div className='fixed top-0 right-0 mr-8 mt-8'>
      {notifications.map((notification, id) => {
        const key = id;
        return (
          <Notification
            key={key}
            id={notification.id}
            theme={notification.theme || NOTIFICATION_THEME_SUCCESS}
            // onNotificationHidden={setNotificationHidden}
          >
            {notification.content}
          </Notification>
        );
      })}
    </div>
  ) : null;
}
export default NotificationManager;
