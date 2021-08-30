import { Timestamp } from '@firebase/firestore-types';

export const RecurringCollection = 'recurring';

export interface Recurring {
  id: string;
  amount: number;
  imageIcon?: string;
  metadata?: { monthlyPaymentsRemaining?: number };
  monthlyPayment: boolean;
  recurringDate: Timestamp;
  type: 'debit' | 'credit';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
