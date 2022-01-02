import cn from 'classnames';
import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useNotificationDispatch } from '../../providers/NotificationProvider';
import { REMOVE_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import {
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_SUCCESS,
  NOTIFICATION_THEME_WARNING
} from '../../utils/Constants/ThemeConstants';

type NotificationProps = {
  id: number;
  children: React.ReactNode;
  theme: string;
};

const Notification: React.FC<NotificationProps> = ({ id, children, theme }) => {
  const dispatch = useNotificationDispatch();
  const [animationState, setAnimationState] = useState<'entry' | 'exit'>(
    'entry'
  );

  return (
    <div
      className={cn(
        'rounded p-2 mb-4',
        theme === NOTIFICATION_THEME_SUCCESS && 'bg-indigo-200 text-indigo-800',
        theme === NOTIFICATION_THEME_FAILURE && 'bg-red-200 text-red-800',
        theme === NOTIFICATION_THEME_WARNING && 'bg-yellow-200 text-yellow-800',
        animationState === 'entry' && 'animate-slide-in-left',
        animationState === 'exit' && 'animate-slide-out-right'
      )}
      onAnimationEnd={() => {
        if (animationState === 'exit') {
          dispatch({ type: REMOVE_NOTIFICATION, payload: { id } });
        }
      }}
    >
      <div className='flex items-center'>
        <div className='flex-auto text-sm'>{children}</div>
        <button
          type='button'
          onClick={() => {
            setAnimationState('exit');
          }}
        >
          <XIcon className='w-4 h-4 ml-6' />
        </button>
      </div>
    </div>
  );
};

export default Notification;
