export type NewTransactionState = {
  transactionType: string;
  amount: number;
  name: string;
};

export type NotificationItem = {
  id: number;
};

export type NotificationState = {
  notifications: NotificationItem[];
};

interface Action {
  type: string;
}
export interface NewTransactionAction extends Action {
  payload: {
    transactionType?: string;
    amount?: number;
    name?: string;
  };
}

export interface NotificationAction extends Action {
  payload: { id: number; content: string; theme?: string };
}
