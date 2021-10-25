import { Timestamp } from '@firebase/firestore-types';
import {
  RecurringTransactionCategory,
  RecurringTransactionFrequency,
  RecurringTransactionType
} from '../utils/constants';

export interface Recurring {
  id?: string;
  name: string;
  amount: number;
  recurringDate: Timestamp;
  endingDate?: Timestamp;
  category: typeof RecurringTransactionCategory[number];
  type: typeof RecurringTransactionType[number];
  metadata?: {
    monthlyPaymentsRemaining?: number;
    frequency?: typeof RecurringTransactionFrequency[number];
  };
  completed?: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  imageIcon?: string;
}
