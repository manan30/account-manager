import { useReducer } from 'react';
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../../utils/Constants/ActionTypes/NotificationReducerActionTypes';

const notificationDefaultState = {
  notifications: []
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return state.notifications.concat(action.payload);
    case REMOVE_NOTIFICATION:
      return state.notifications.filter(
        (notification) => notification.id !== action.id
      );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () => useReducer(notificationReducer, notificationDefaultState);
