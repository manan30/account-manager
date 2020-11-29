import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const NotificationStateContext = React.createContext();
const NotificationDispatchContext = React.createContext();

function NotificationProvider({ children }) {
  return (
    <NotificationStateContext.Provider>
      <NotificationDispatchContext.Provider>
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
