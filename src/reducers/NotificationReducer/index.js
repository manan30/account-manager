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
      return { notifications: [...state.notifications, action.payload] };
    case REMOVE_NOTIFICATION:
      // console.log(
      //   action.state.notifications.filter((_, i) => i !== action.payload)
      // );
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
