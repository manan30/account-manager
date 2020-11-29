import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useNotificationReducer from '../../reducers/NotificationReducer';

const NotificationStateContext = React.createContext();
const NotificationDispatchContext = React.createContext();

function NotificationProvider({ children }) {
  const [state, dispatch] = useNotificationReducer();
  return (
    <NotificationStateContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  );
}

NotificationProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default NotificationProvider;

export const useNotificationStateContext = () => {
  const context = useContext(NotificationStateContext);
  if (context === undefined) {
    throw new Error(
      'useNotificationState must be used within a NotificationStateProvider'
    );
  }
  return context;
};

export const useNotificationDispatch = () => {
  const context = useContext(NotificationDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useNotificationDispatch must be used within a NotificationDispatchProvider'
    );
  }
  return context;
};
