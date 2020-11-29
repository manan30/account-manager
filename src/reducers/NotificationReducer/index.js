import { useReducer } from 'react';
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../../utils/Constants/ActionTypes/NotificationReducerActionTypes';

const notificationDefaultState = {
  content: '',
  theme: '',
  showNotification: false
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        content: action.payload.content,
        theme: action.payload.theme,
        showNotification: true
      };
    case REMOVE_NOTIFICATION:
      return { ...state, showNotification: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () => useReducer(notificationReducer, notificationDefaultState);
