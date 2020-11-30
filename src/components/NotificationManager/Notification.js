import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
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
  //   }, 2000);
  // }, [id]);

  return (
    <div
      className={cn(
        'w-notification-width rounded p-2 mb-4',
        isNotificationShown
          ? 'animate-notification-entry'
          : 'animate-notification-exit',
        theme === NOTIFICATION_THEME_SUCCESS && 'bg-indigo-200 text-indigo-800',
        theme === NOTIFICATION_THEME_FAILURE && 'bg-red-200 text-red-800',
        theme === NOTIFICATION_THEME_WARNING && 'bg-yellow-200 text-yellow-800'
      )}
      onAnimationEnd={() => {
        if (!isNotificationShown) {
          dispatch({ type: REMOVE_NOTIFICATION, payload: id });
        }
      }}
    >
      <div className='flex items-center'>
        <div className='flex-auto'>{children}</div>
        <button
          type='button'
          onClick={() => dispatch({ type: REMOVE_NOTIFICATION, payload: id })}
        >
          <IoIosClose size={24} />
        </button>
      </div>
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
