import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import {
  NOTIFICATION_THEME_SUCCESS,
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_WARNING
} from '../../utils/Constants/ThemeConstants';
import { useNotificationDispatchContext } from '../../contexts/NotificationContext';
import { REMOVE_NOTIFICATION } from '../../utils/Constants/ActionTypes/NotificationReducerActionTypes';

function Notification({ id, children, theme }) {
  const dispatch = useNotificationDispatchContext();
  const [isNotificationShown, setIsNotificationShown] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsNotificationShown(false);
  //   }, 2000 * id);
  // }, [id]);

  return (
    <div
      className={cn(
        'w-notification-width rounded p-2 mb-4 text-indigo-100',
        isNotificationShown
          ? 'animate-notification-entry'
          : 'animate-notification-exit',
        theme === NOTIFICATION_THEME_SUCCESS && 'bg-indigo-600',
        theme === NOTIFICATION_THEME_FAILURE && 'bg-red-600',
        theme === NOTIFICATION_THEME_WARNING && 'bg-yellow-500'
      )}
      onAnimationEnd={() => {
        console.log(!isNotificationShown);
        if (!isNotificationShown) {
          dispatch({ type: REMOVE_NOTIFICATION, payload: id });
        }
      }}
    >
      {children}
    </div>
  );
}

Notification.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  theme: PropTypes.string.isRequired
};

export default Notification;
