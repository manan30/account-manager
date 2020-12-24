import { Timestamp } from '@firebase/firestore-types';
export interface ITransaction {
  id?: string;
  transactionType: string;
  transactionEntity?: string;
  amount: number;
  transactionDate?: Timestamp;
  createdAt: Timestamp;
}
