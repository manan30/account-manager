import { useReducer } from 'react';

const newTransactionInitialState = {
  transactionType: '',
  amount: 0
};

const newTransactionReducer = (state, action) => {
  switch (action.type) {
    default:
      throw new Error('Unknown action');
  }
};

export default function useTransactionReducer() {
  return useReducer(newTransactionReducer, newTransactionInitialState);
}
