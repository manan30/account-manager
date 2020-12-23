export const ADD_TRANSACTION_TYPE = 'ADD_TRANSACTION_TYPE';
export const ADD_AMOUNT = 'ADD_AMOUNT';
export const ADD_NAME = 'ADD_NAME';

export interface INewTransactionState {
  transactionType: string;
  amount: number;
  entity: string;
  transactionDate: string;
}

export type NewTransactionActionType =
  | 'ADD_TRANSACTION_TYPE'
  | 'ADD_AMOUNT'
  | 'ADD_TRANSACTION_ENTITY'
  | 'ADD_TRANSACTION_DATE';

export interface INewTransactionAction {
  type: NewTransactionActionType;
  payload: {
    transactionType?: string;
    amount?: number;
    entity?: string;
    transactionDate?: string;
  };
}
