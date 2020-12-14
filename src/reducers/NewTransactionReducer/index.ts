import { useReducer } from 'react';
import {
  INewTransactionAction,
  INewTransactionState
} from './newTransactionReducer.interface';
import {
  ADD_AMOUNT,
  ADD_NAME,
  ADD_TRANSACTION_TYPE
} from './newTransactionReducer.interface';

const newTransactionInitialState = {
  transactionType: '',
  amount: 0,
  name: ''
} as INewTransactionState;

const newTransactionReducer = (
  state: INewTransactionState,
  action: INewTransactionAction
) => {
  switch (action.type) {
    case ADD_TRANSACTION_TYPE:
      return {
        ...state,
        transactionType: action.payload.transactionType
      } as INewTransactionState;
    case ADD_AMOUNT:
      return {
        ...state,
        amount: action.payload.amount
      } as INewTransactionState;
    case ADD_NAME:
      return { ...state, name: action.payload.name } as INewTransactionState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () =>
  useReducer(newTransactionReducer, newTransactionInitialState);
