import {
  ADD_AMOUNT,
  ADD_NAME,
  ADD_TRANSACTION_TYPE
} from 'utils/Constants/ActionTypes/NewTransactionReducerActionTypes';

export type NewTransactionState = {
  transactionType: string;
  amount: number;
  name: string;
};

export interface INewTransactionAction {
  type: typeof ADD_TRANSACTION_TYPE | typeof ADD_AMOUNT | typeof ADD_NAME;
  payload: {
    transactionType?: string;
    amount?: number;
    name?: string;
  };
}
