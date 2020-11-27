import { useReducer } from 'react';
import { ADD_AMOUNT, ADD_TRANSACTION_TYPE } from '../../utils/Constants';

const newTransactionInitialState = {
  transactionType: '',
  amount: 0
};

const newTransactionReducer = (state, action) => {
  switch (action.type) {
    case ADD_TRANSACTION_TYPE:
      return { ...state, transactionType: action.payload };
    case ADD_AMOUNT:
      return { ...state, amount: action.payload };
    default:
      throw new Error('Unknown action');
  }
};

export default () =>
  useReducer(newTransactionReducer, newTransactionInitialState);
