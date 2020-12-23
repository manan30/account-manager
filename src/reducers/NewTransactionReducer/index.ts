import { useReducer } from 'react';
import {
  INewTransactionAction,
  INewTransactionState
} from './newTransactionReducer.interface';

const newTransactionInitialState = {
  type: '',
  amount: 0,
  entity: '',
  date: ''
} as INewTransactionState;

const newTransactionReducer = (
  state: INewTransactionState,
  action: INewTransactionAction
) => {
  switch (action.type) {
    case 'ADD_TRANSACTION_TYPE':
      return {
        ...state,
        type: action.payload.type
      } as INewTransactionState;
    case 'ADD_TRANSACTION_ENTITY':
      return {
        ...state,
        entity: action.payload.entity
      } as INewTransactionState;
    case 'ADD_TRANSACTION_AMOUNT':
      return {
        ...state,
        amount: action.payload.amount
      } as INewTransactionState;
    case 'ADD_TRANSACTION_DATE':
      return {
        ...state,
        date: action.payload.date
      } as INewTransactionState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default () =>
  useReducer(newTransactionReducer, newTransactionInitialState);
