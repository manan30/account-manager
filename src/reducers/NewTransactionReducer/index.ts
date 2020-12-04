import { useReducer } from 'react';
import {
  INewTransactionAction,
  NewTransactionState
} from './newTransactionReducer.interface';
import {
  ADD_AMOUNT,
  ADD_NAME,
  ADD_TRANSACTION_TYPE
} from '../../utils/Constants/ActionTypes/NewTransactionReducerActionTypes';

const newTransactionInitialState = {
  transactionType: '',
  amount: 0,
  name: ''
} as NewTransactionState;

const newTransactionReducer = (
  state: NewTransactionState,
  action: INewTransactionAction
) => {
  switch (action.type) {
    case ADD_TRANSACTION_TYPE:
      return {
        ...state,
        transactionType: action.payload.transactionType
      } as NewTransactionState;
    case ADD_AMOUNT:
      return { ...state, amount: action.payload.amount } as NewTransactionState;
    case ADD_NAME:
      return { ...state, name: action.payload.name } as NewTransactionState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () =>
  useReducer(newTransactionReducer, newTransactionInitialState);
