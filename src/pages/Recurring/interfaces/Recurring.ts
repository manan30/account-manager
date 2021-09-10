import { Timestamp } from '@firebase/firestore-types';

export type RecurringTransactionType = 'debit' | 'credit';

export type RecurringTransactionFrequency =
  | 'Bi-Weekly'
  | 'Bi-Monthly'
  | 'Monthly'
  | 'Custom';

export type RecurringTransactionCategory =
  | 'Bills'
  | 'Rent'
  | 'Payment'
  | 'Income'
  | 'Other';

export interface Recurring {
  id?: string;
  name: string;
  amount: number;
  recurringDate: Timestamp;
  endingDate: Timestamp;
  category: RecurringTransactionCategory;
  type: RecurringTransactionType;
  metadata?: {
    monthlyPaymentsRemaining?: number;
    frequency?: RecurringTransactionFrequency;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  imageIcon?: string;
}
