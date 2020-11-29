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
      return { notifications: [action.payload, ...state.notifications] };
    case REMOVE_NOTIFICATION:
      return {
        notifications: state.notifications.filter(
          (_, i) => i !== action.payload
        )
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () => useReducer(notificationReducer, notificationDefaultState);
