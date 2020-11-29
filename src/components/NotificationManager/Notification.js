import React from 'react';
import cn from 'classnames';
import {
  NOTIFICATION_THEME_SUCCESS,
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_WARNING
} from '../../utils/Constants/ThemeConstants';

function Notification({ id, children, theme }) {
  return (
    <div
      className={cn(
        'w-notification-width rounded p-2 mb-4 text-indigo-100',
        theme === NOTIFICATION_THEME_SUCCESS && 'bg-indigo-600',
        theme === NOTIFICATION_THEME_FAILURE && 'bg-red-600',
        theme === NOTIFICATION_THEME_WARNING && 'bg-yellow-500'
      )}
    >
      {children}
    </div>
  );
}

export default Notification;
