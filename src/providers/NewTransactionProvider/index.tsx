import React, { Dispatch, useContext } from 'react';
import useTransactionReducer from '../../reducers/NewTransactionReducer';
import {
  INewTransactionAction,
  INewTransactionState
} from '../../reducers/NewTransactionReducer/newTransactionReducer.interface';

const NewTransactionStateContext = React.createContext<
  INewTransactionState | undefined
>(undefined);
const NewTransactionDispatchContext = React.createContext<
  Dispatch<INewTransactionAction> | undefined
>(undefined);

type NewTransactionProviderProps = { children: React.ReactNode };

const NewTransactionProvider: React.FC<NewTransactionProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useTransactionReducer();
  return (
    <NewTransactionStateContext.Provider value={state}>
      <NewTransactionDispatchContext.Provider value={dispatch}>
        {children}
      </NewTransactionDispatchContext.Provider>
    </NewTransactionStateContext.Provider>
  );
};

export default NewTransactionProvider;

export const useNewTransactionStateContext = () => {
  const context = useContext(NewTransactionStateContext);
  if (context === undefined) {
    throw new Error(
      'useNewTransactionState must be used within a NewTransactionStateProvider'
    );
  }
  return context;
};

export const useNewTransactionDispatchContext = () => {
  const context = useContext(NewTransactionDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useNewTransactionDispatch must be used within a NewTransactionDispatchProvider'
    );
  }
  return context;
};
