import { Timestamp } from '@firebase/firestore-types';

export const RecurringCollection = 'recurring';

export type RecurringTransactionType = 'debit' | 'credit';

export type RecurringTransactionFrequency =
  | 'Bi-Weekly'
  | 'Bi-Monthly'
  | 'Monthly'
  | 'custom';

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
  imageIcon?: string;
  category?: RecurringTransactionCategory;
  metadata?: {
    monthlyPaymentsRemaining?: number;
    frequency?: RecurringTransactionFrequency;
  };
  recurringDate: Timestamp;
  endingDate?: Timestamp;
  type: RecurringTransactionType;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
