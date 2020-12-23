export interface INewTransactionState {
  type: string;
  amount: string;
  entity: string;
  date: string;
}

export type NewTransactionActionType =
  | 'ADD_TRANSACTION_TYPE'
  | 'ADD_TRANSACTION_AMOUNT'
  | 'ADD_TRANSACTION_ENTITY'
  | 'ADD_TRANSACTION_DATE';

export interface INewTransactionAction {
  type: NewTransactionActionType;
  payload: {
    type?: string;
    amount?: string;
    entity?: string;
    date?: string;
  };
}
