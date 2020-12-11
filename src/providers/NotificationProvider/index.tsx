import React, { Dispatch, useContext } from 'react';
import {
  INotificationAction,
  INotificationState
} from '../../reducers/NotificationReducer/notificationReducer.interface';
import useNotificationReducer from '../../reducers/NotificationReducer';

const NotificationStateContext = React.createContext<
  INotificationState | undefined
>(undefined);
const NotificationDispatchContext = React.createContext<
  Dispatch<INotificationAction> | undefined
>(undefined);

type NotificationProviderProps = { children: React.ReactNode };

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useNotificationReducer();
  return (
    <NotificationStateContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  );
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

export const useNotificationDispatchContext = () => {
  const context = useContext(NotificationDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useNotificationDispatch must be used within a NotificationDispatchProvider'
    );
  }
  return context;
};
