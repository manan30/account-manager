import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useTransactionReducer from '../../reducers/NewTransactionReducer';

const NewTransactionStateContext = React.createContext();
const NewTransactionDispatchContext = React.createContext();

function NewTransactionProvider({ children }) {
  const [state, dispatch] = useTransactionReducer();
  return (
    <NewTransactionStateContext.Provider value={state}>
      <NewTransactionDispatchContext.Provider value={dispatch}>
        {children}
      </NewTransactionDispatchContext.Provider>
    </NewTransactionStateContext.Provider>
  );
}

NewTransactionProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default NewTransactionProvider;

export const useNewTransactionStateContext = () => {
  const context = useContext(NewTransactionStateContext);
  if (context === undefined) {
    throw new Error(
      'useNewTransactionState must be used within a NewTransactionProvider'
    );
  }
  return context;
};

export const useNewTransactionDispatchContext = () => {
  const context = useContext(NewTransactionDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useNewTransactionDispatch must be used within a NewTransactionProvider'
    );
  }
  return context;
};
