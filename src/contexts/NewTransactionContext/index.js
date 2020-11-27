import React, { useContext } from 'react';
import useTransactionReducer from '../../reducers/NewTransactionReducer';

const NewTransactionContext = React.createContext();

function NewTransactionContextProvider({ children }) {
  const [state, dispatch] = useTransactionReducer();
  return (
    <NewTransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </NewTransactionContext.Provider>
  );
}

export default NewTransactionContextProvider;

export const useNewTransactionContext = () => useContext(NewTransactionContext);
