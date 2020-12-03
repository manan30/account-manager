import {
  ADD_AMOUNT,
  ADD_NAME,
  ADD_TRANSACTION_TYPE
} from 'utils/Constants/ActionTypes/NewTransactionReducerActionTypes';
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from 'utils/Constants/ActionTypes/NotificationReducerActionTypes';

export type NewTransactionState = {
  transactionType: string;
  amount: number;
  name: string;
};

export type NotificationItem = {
  id: number;
  content?: string;
  theme?: string;
};

export type NotificationState = {
  notifications: NotificationItem[];
};

interface Action {
  type: string;
}
export interface NewTransactionAction extends Action {
  type: typeof ADD_TRANSACTION_TYPE | typeof ADD_AMOUNT | typeof ADD_NAME;
  payload: {
    transactionType?: string;
    amount?: number;
    name?: string;
  };
}

export interface NotificationAction extends Action {
  type: typeof ADD_NOTIFICATION | typeof REMOVE_NOTIFICATION;
  payload: { id: number; content?: string; theme?: string };
}
