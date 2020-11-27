import { useReducer } from 'react';
import {
  ADD_AMOUNT,
  ADD_NAME,
  ADD_TRANSACTION_TYPE
} from '../../utils/Constants';

const newTransactionInitialState = {
  transactionType: '',
  amount: 0,
  name: ''
};

const newTransactionReducer = (state, action) => {
  switch (action.type) {
    case ADD_TRANSACTION_TYPE:
      return { ...state, transactionType: action.payload };
    case ADD_AMOUNT:
      return { ...state, amount: action.payload };
    case ADD_NAME:
      return { ...state, name: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () =>
  useReducer(newTransactionReducer, newTransactionInitialState);
