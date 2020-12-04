import { useReducer } from 'react';
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../../utils/Constants/ActionTypes/NotificationReducerActionTypes';
import {
  INotificationAction,
  NotificationItem,
  NotificationState
} from './notificationReducer.interface';

const notificationDefaultState = {
  notifications: [] as NotificationItem[]
} as NotificationState;

const notificationReducer = (
  state: NotificationState,
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
