import { useReducer } from 'react';
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from './notificationReducer.interface';
import {
  INotificationAction,
  NotificationItem,
  INotificationState
} from './notificationReducer.interface';

const notificationDefaultState = {
  notifications: [] as NotificationItem[]
} as INotificationState;

const notificationReducer = (
  state: INotificationState,
  action: INotificationAction
) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        notifications: [
          {
            ...action.payload,
            id: Math.floor(Math.random() * 100 + 1)
          },
          ...state.notifications
        ]
      };
    case REMOVE_NOTIFICATION:
      return {
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload.id
        )
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () => useReducer(notificationReducer, notificationDefaultState);
