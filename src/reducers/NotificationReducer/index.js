import { useReducer } from 'react';

const notificationDefaultState = {
  content: '',
  theme: '',
  showNotification: false
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () => useReducer(notificationReducer, notificationDefaultState);
