import { Timestamp } from '@firebase/firestore-types';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export interface ITransaction extends DocumentSnapshot {
  id: string;
  transactionType: string;
  transactionEntity: string;
  amount: number;
  transactionDate: Timestamp;
  createdAt: Timestamp;
}
