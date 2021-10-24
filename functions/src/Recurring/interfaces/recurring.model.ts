import { Timestamp } from '@firebase/firestore-types';

export const RecurringCollection = 'recurring';

export type RecurringTransactionType = 'debit' | 'credit';

export type RecurringTransactionFrequency =
  | 'Bi-Weekly'
  | 'Bi-Monthly'
  | 'Monthly';
// | 'custom';

export type RecurringTransactionCategory =
  | 'Bills'
  | 'Rent'
  | 'Payment'
  | 'Income'
  | 'Subscriptions'
  | 'Other';

export interface Recurring {
  id?: string;
  name: string;
  amount: number;
  recurringDate: Timestamp;
  endingDate?: Timestamp;
  category: RecurringTransactionCategory;
  type: RecurringTransactionType;
  metadata?: {
    monthlyPaymentsRemaining?: number;
    frequency?: RecurringTransactionFrequency;
  };
  completed?: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  imageIcon?: string;
}
