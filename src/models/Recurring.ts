import { Timestamp } from '@firebase/firestore-types';

export type RecurringTransactionType = 'debit' | 'credit';

export interface Recurring {
  id?: string;
  name: string;
  amount: number;
  imageIcon?: string;
  metadata?: { monthlyPaymentsRemaining?: number };
  monthlyPayment: boolean;
  recurringDate: Timestamp;
  type: RecurringTransactionType;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
