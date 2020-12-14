export const ADD_TRANSACTION_TYPE = 'ADD_TRANSACTION_TYPE';
export const ADD_AMOUNT = 'ADD_AMOUNT';
export const ADD_NAME = 'ADD_NAME';

export interface INewTransactionState {
  transactionType: string;
  amount: number;
  name: string;
}

export interface INewTransactionAction {
  type: typeof ADD_TRANSACTION_TYPE | typeof ADD_AMOUNT | typeof ADD_NAME;
  payload: {
    transactionType?: string;
    amount?: number;
    name?: string;
  };
}
