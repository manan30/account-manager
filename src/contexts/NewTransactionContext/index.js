import React, { useContext } from 'react';
import useTransactionReducer from '../../reducers/NewTransactionReducer';

const NewTransactionStateContext = React.createContext();
const NewTransactionDispatchContext = React.createContext();

function NewTransactionContextProvider({ children }) {
  const [state, dispatch] = useTransactionReducer();
  return (
    <NewTransactionStateContext.Provider value={state}>
      <NewTransactionDispatchContext.Provider value={dispatch}>
        {children}
      </NewTransactionDispatchContext.Provider>
    </NewTransactionStateContext.Provider>
  );
}

export default NewTransactionContextProvider;

export const useNewTransactionStateContext = () =>
  useContext(NewTransactionStateContext);

export const useNewTransactionDispatchContext = () =>
  useContext(NewTransactionDispatchContext);
